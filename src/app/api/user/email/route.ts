import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { client } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Diagnostics: capture available Clerk SDK methods for debugging
const _clerkEmailMethods = Object.keys(
  (clerkClient as any).emailAddresses || {}
);
const _clerkUserMethods = Object.keys((clerkClient as any).users || {});
console.debug("Clerk SDK methods available:", {
  email: _clerkEmailMethods,
  users: _clerkUserMethods,
});

export async function PUT(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { email } = body;
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const dbUser = await client.user.findUnique({
      where: { clerkid: clerkId },
    });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update our database first
    let updated;
    try {
      updated = await client.user.update({
        where: { clerkid: clerkId },
        data: { email },
        select: { email: true, clerkid: true },
      });
    } catch (dbErr: any) {
      console.error("DB update failed:", dbErr);
      // Prisma unique constraint error (P2002)
      const prismaCode =
        dbErr?.code ||
        dbErr?.meta?.code ||
        (dbErr &&
        dbErr.message &&
        typeof dbErr.message === "string" &&
        dbErr.message.includes("P2002")
          ? "P2002"
          : undefined);
      if (prismaCode === "P2002") {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Failed to update user record" },
        { status: 500 }
      );
    }

    // For Clerk update, since admin API isn't working, we need to guide the user
    // to update their email in Clerk directly through the frontend API
    return NextResponse.json({
      success: true,
      email: updated.email,
      message: "Database updated successfully. Now updating Clerk...",
      nextStep: {
        action: "updateClerkEmail",
        newEmail: email,
        instructions:
          "Your app database has been updated. The system will now attempt to update your authentication provider.",
      },
    });
  } catch (error) {
    console.error("Error updating email:", error);
    const msg = (error as any)?.message || JSON.stringify(error);
    return NextResponse.json(
      { error: "Failed to update email", details: String(msg) },
      { status: 500 }
    );
  }
}
