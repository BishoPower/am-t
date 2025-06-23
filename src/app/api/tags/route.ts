import { NextResponse } from "next/server";
import { client as prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get popular tags with listing counts
    const tags = await prisma.tag.findMany({
      include: {
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
      orderBy: {
        listings: {
          _count: "desc",
        },
      },
      take: 20, // Limit to top 20 popular tags
    });

    // Format the response
    const popularTags = tags
      .filter((tag) => tag._count.listings > 0)
      .map((tag) => ({
        name: tag.name,
        count: tag._count.listings,
      }));

    return NextResponse.json(popularTags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}
