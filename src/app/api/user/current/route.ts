import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database, create if doesn't exist
    let dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      // Create user if doesn't exist
      dbUser = await client.user.create({
        data: {
          clerkid: user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
          username:
            user.username ||
            user.emailAddresses[0]?.emailAddress.split("@")[0] ||
            `user${Date.now()}`,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          image: user.imageUrl || null,
        },
      });
    }

    return NextResponse.json({
      id: dbUser.id,
      username: dbUser.username,
      displayName: dbUser.displayName,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      email: dbUser.email,
      image: dbUser.image,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
