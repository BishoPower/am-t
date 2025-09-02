import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { username: string; slug: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { username, slug } = params;

    // Find the editorial
    const editorial = await client.editorial.findFirst({
      where: {
        slug: slug,
        author: {
          username: username,
        },
        published: true,
      },
    });

    if (!editorial) {
      return NextResponse.json(
        { error: "Editorial not found" },
        { status: 404 }
      );
    }

    // Check if user has already liked this editorial
    const existingLike = await client.editorialLike.findUnique({
      where: {
        userId_editorialId: {
          userId: dbUser.id,
          editorialId: editorial.id,
        },
      },
    });

    let isLiked: boolean;

    if (existingLike) {
      // Unlike - remove the like
      await client.editorialLike.delete({
        where: {
          userId_editorialId: {
            userId: dbUser.id,
            editorialId: editorial.id,
          },
        },
      });
      isLiked = false;
    } else {
      // Like - create the like
      await client.editorialLike.create({
        data: {
          userId: dbUser.id,
          editorialId: editorial.id,
        },
      });
      isLiked = true;
    }

    // Get updated like count
    const likeCount = await client.editorialLike.count({
      where: {
        editorialId: editorial.id,
      },
    });

    return NextResponse.json({
      isLiked,
      likeCount,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
