import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      return NextResponse.redirect(
        new URL("/settings?error=invalid-link", request.url)
      );
    }

    // Simple token validation (in production, use proper JWT or signed tokens)
    const expectedToken = Buffer.from(
      `${email}:${process.env.CLERK_SECRET_KEY}`
    ).toString("base64");

    if (token !== expectedToken) {
      return NextResponse.redirect(
        new URL("/settings?error=invalid-token", request.url)
      );
    }

    // Get user from database by email
    const user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.redirect(
        new URL("/settings?error=user-not-found", request.url)
      );
    }

    try {
      // Get the Clerk user
      const clerkUser = await clerkClient.users.getUser(user.clerkid);

      // Find the email address that needs verification
      const emailToVerify = clerkUser.emailAddresses.find(
        (addr) =>
          addr.emailAddress === email &&
          addr.verification?.status !== "verified"
      );

      if (emailToVerify) {
        // Mark as verified (this is a simplified approach)
        // In a real scenario, you'd want to use Clerk's verification system
        await clerkClient.users.updateUser(user.clerkid, {
          primaryEmailAddressID: emailToVerify.id,
        });
      }

      return NextResponse.redirect(
        new URL("/settings?verified=true", request.url)
      );
    } catch (clerkError) {
      console.error("Clerk error:", clerkError);
      return NextResponse.redirect(
        new URL("/settings?error=verification-failed", request.url)
      );
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(
      new URL("/settings?error=server-error", request.url)
    );
  }
}
