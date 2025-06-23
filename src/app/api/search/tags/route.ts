import { NextRequest, NextResponse } from "next/server";
import { client as prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const popular = searchParams.get("popular") === "true";
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";

    if (popular) {
      // Get popular tags with listing counts
      const tags = await prisma.tag.findMany({
        select: {
          name: true,
          _count: {
            select: {
              listings: {
                where: {
                  isPrivate: false,
                  status: "ACTIVE",
                },
              },
            },
          },
        },
        where: search
          ? {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }
          : undefined,
        orderBy: {
          listings: {
            _count: "desc",
          },
        },
        take: limit,
      });

      // Transform to include count
      const popularTags = tags
        .filter((tag) => tag._count.listings > 0)
        .map((tag) => ({
          name: tag.name,
          count: tag._count.listings,
        }));

      return NextResponse.json(popularTags);
    } else {
      // Regular tag search
      const tags = await prisma.tag.findMany({
        select: {
          name: true,
        },
        where: search
          ? {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }
          : undefined,
        orderBy: {
          name: "asc",
        },
        take: limit,
      });

      return NextResponse.json(tags);
    }
  } catch (error) {
    console.error("Search tags error:", error);
    return NextResponse.json(
      { error: "Failed to search tags" },
      { status: 500 }
    );
  }
}
