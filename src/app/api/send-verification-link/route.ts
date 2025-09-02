import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const authResult = await auth();
    const userId = authResult?.userId;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate verification token
    const token = Buffer.from(
      `${email}:${process.env.CLERK_SECRET_KEY}`
    ).toString("base64");

    // Create verification link
    const verificationLink = `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/api/verify-email?token=${encodeURIComponent(
      token
    )}&email=${encodeURIComponent(email)}`;

    // In a real app, you'd send this via email service (SendGrid, Resend, etc.)
    // For now, we'll just return the link for testing

    // You would replace this with actual email sending
    // Example with a hypothetical email service:
    /*
    await sendEmail({
      to: email,
      subject: "Verify your new email address",
      html: `
        <h2>Verify your email address</h2>
        <p>Click the link below to verify your new email address:</p>
        <a href="${verificationLink}" style="background: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
          Verify Email Address
        </a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p>${verificationLink}</p>
      `
    });
    */

    return NextResponse.json({
      success: true,
      message: "Verification link generated",
      // Remove this in production - only for testing
      verificationLink: verificationLink,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    );
  }
}
