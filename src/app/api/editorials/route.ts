import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const staffPicked = searchParams.get("staffPicked");
    const authorUsername = searchParams.get("authorUsername");
    const exclude = searchParams.get("exclude");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const whereClause: any = {
      published: true,
    };

    // Filter by staff picked if requested
    if (staffPicked === "true") {
      whereClause.isStaffPicked = true;
    }

    // Filter by author username if requested
    if (authorUsername) {
      whereClause.author = {
        username: authorUsername,
      };
    }

    // Exclude specific slug if requested (for related articles)
    if (exclude) {
      whereClause.slug = {
        not: exclude,
      };
    }

    const editorials = await client.editorial.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    const totalCount = await client.editorial.count({
      where: whereClause,
    });

    return NextResponse.json({
      editorials,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching editorials:", error);
    return NextResponse.json(
      { error: "Failed to fetch editorials" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const { title, subtitle, content, excerpt, image, tags } =
      await request.json();

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");

    // Ensure slug is unique per user (not globally)
    let uniqueSlug = slug;
    let counter = 1;
    while (
      await client.editorial.findFirst({
        where: {
          slug: uniqueSlug,
          authorId: dbUser.id,
        },
      })
    ) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const editorial = await client.editorial.create({
      data: {
        title,
        subtitle: subtitle || null,
        content,
        excerpt: excerpt || content.substring(0, 200) + "...",
        image: image || null,
        category: "COMMUNITY", // Default category for user-generated content
        slug: uniqueSlug,
        tags: Array.isArray(tags) ? tags : [],
        authorId: dbUser.id,
        published: true,
        isStaffPicked: false, // Only staff can mark as staff picked
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(editorial, { status: 201 });
  } catch (error) {
    console.error("Error creating editorial:", error);
    return NextResponse.json(
      { error: "Failed to create editorial" },
      { status: 500 }
    );
  }
}
