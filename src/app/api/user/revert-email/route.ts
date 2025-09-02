import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { originalEmail } = body;

    if (!originalEmail || typeof originalEmail !== "string") {
      return NextResponse.json(
        { error: "Original email is required" },
        { status: 400 }
      );
    }

    // Revert the database email back to the original
    const updated = await client.user.update({
      where: { clerkid: clerkId },
      data: { email: originalEmail },
      select: { email: true, clerkid: true },
    });

    return NextResponse.json({
      success: true,
      email: updated.email,
      message:
        "Email reverted to original. You should now be able to sign in with your original email.",
    });
  } catch (error) {
    console.error("Error reverting email:", error);
    return NextResponse.json(
      { error: "Failed to revert email" },
      { status: 500 }
    );
  }
}
