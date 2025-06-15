import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client as prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, imageUrls, tags, isPrivate } = body;

    // Validation
    if (!title || !description || !imageUrls || imageUrls.length === 0) {
      return NextResponse.json(
        { error: "Title, description, and at least one image are required" },
        { status: 400 }
      );
    }

    // Find user by clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkid: userId },
      include: { closet: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Ensure user has a closet
    let closet = user.closet;
    if (!closet) {
      closet = await prisma.closet.create({
        data: {
          userId: user.id,
          name: "My Closet",
        },
      });
    }

    // Create the listing
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageUrls,
        isPrivate: isPrivate || false,
        userId: user.id,
        closetId: closet.id,
        tags: {
          connectOrCreate:
            tags?.map((tagName: string) => ({
              where: { name: tagName.toLowerCase() },
              create: { name: tagName.toLowerCase() },
            })) || [],
        },
      },
      include: {
        tags: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Create listing error:", error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const tags = searchParams.get("tags")?.split(",") || [];

    const skip = (page - 1) * limit;

    const where: any = {
      isPrivate: false,
      status: "ACTIVE",
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (tags.length > 0) {
      where.tags = {
        some: {
          name: { in: tags },
        },
      };
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          tags: true,
          user: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
          _count: {
            select: {
              favorites: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.listing.count({ where }),
    ]);

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get listings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
