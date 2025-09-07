import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    // Get the clerk ID from query params
    const clerkId = request.nextUrl.searchParams.get("clerkId");

    // Validate the request
    const { userId } = await auth();
    if (!userId || userId !== clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user from database
    const user = await client.user.findUnique({
      where: { clerkid: userId },
      select: {
        id: true,
        username: true,
        image: true,
        firstName: true,
        lastName: true,
        displayName: true,
        bio: true,
        location: true,
        isAdmin: true, // Include admin status
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user profile data
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { username, displayName, bio, location } = body;

    // Get current user to check if username is being changed
    const currentUser = await client.user.findUnique({
      where: { clerkid: userId },
      select: { username: true },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If username is being changed, check if the new username is available
    if (username && username !== currentUser.username) {
      const existingUser = await client.user.findUnique({
        where: { username: username },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 400 }
        );
      }

      // Basic username validation
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return NextResponse.json(
          {
            error:
              "Username can only contain letters, numbers, and underscores",
          },
          { status: 400 }
        );
      }

      if (username.length < 3 || username.length > 30) {
        return NextResponse.json(
          { error: "Username must be between 3 and 30 characters" },
          { status: 400 }
        );
      }
    }

    // Update the user profile
    const updatedUser = await client.user.update({
      where: { clerkid: userId },
      data: {
        ...(username && { username }),
        displayName: displayName || null,
        bio: bio || null,
        location: location || null,
      },
      select: {
        id: true,
        username: true,
        image: true,
        firstName: true,
        lastName: true,
        displayName: true,
        bio: true,
        location: true,
        isAdmin: true, // Include admin status
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
