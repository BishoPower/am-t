import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      // Return general trending data for unauthenticated users
      return NextResponse.json({
        featuredArticles: await getFeaturedArticles(),
        trendingListings: await getTrendingListings(),
        recentListings: await getRecentListings(20),
        categories: await getTopCategories(),
      });
    }

    // Find user in database
    const dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({
        featuredArticles: await getFeaturedArticles(),
        trendingListings: await getTrendingListings(),
        recentListings: await getRecentListings(20),
        categories: await getTopCategories(),
      });
    }

    // Get personalized recommendations with blocked user filtering
    const [
      featuredArticles,
      recommendedForUser,
      basedOnViewed,
      basedOnSearches,
      trendingListings,
      recentListings,
    ] = await Promise.all([
      getFeaturedArticles(),
      getRecommendedListings(dbUser.id),
      getListingsBasedOnViewed(dbUser.id),
      getListingsBasedOnSearches(dbUser.id),
      getTrendingListings(dbUser.id),
      getRecentListings(12, dbUser.id),
    ]);

    return NextResponse.json({
      featuredArticles,
      personalizedSections: [
        {
          title: "Recommended for You",
          subtitle: "Based on your profile and activity",
          listings: recommendedForUser,
          type: "recommended",
        },
        {
          title: "Because You Viewed",
          subtitle: "Similar to items you've checked out",
          listings: basedOnViewed,
          type: "viewed",
        },
        {
          title: "Matching Your Searches",
          subtitle: "Items related to your recent searches",
          listings: basedOnSearches,
          type: "searches",
        },
      ],
      trendingListings,
      recentListings,
    });
  } catch (error) {
    console.error("Error fetching home data:", error);
    return NextResponse.json(
      { error: "Failed to fetch home data" },
      { status: 500 }
    );
  }
}

async function getFeaturedArticles() {
  // Mock editorial articles - in a real app, these would come from a CMS
  return [
    {
      id: "1",
      title: "The Chrome Hearts Phenomenon",
      subtitle: "How the luxury brand became the most traded item this summer",
      image: "/api/placeholder/800/600",
      category: "SURFACED",
      slug: "chrome-hearts-phenomenon",
      date: "June 25, 2025",
    },
    {
      id: "2",
      title: "Vintage Band Tees: Authentication Guide",
      subtitle: "How to spot authentic vintage concert tees",
      image: "/api/placeholder/800/600",
      category: "SHOPPING",
      slug: "vintage-band-tees-guide",
      date: "June 24, 2025",
    },
    {
      id: "3",
      title: "Street Style: AM-T Community Fits",
      subtitle: "The best fits from our trading community",
      image: "/api/placeholder/800/600",
      category: "STREET STYLE",
      slug: "community-street-style",
      date: "June 23, 2025",
    },
  ];
}

async function getRecommendedListings(userId: string) {
  // Get blocked user IDs
  const blockedUserIds = await getBlockedUserIds(userId);

  // Get listings similar to user's favorite tags
  const userTags = await client.listing.findMany({
    where: {
      userId: userId,
      status: "ACTIVE",
    },
    include: {
      tags: true,
    },
    take: 5,
  });

  const userTagNames = userTags.flatMap((listing) =>
    listing.tags.map((tag) => tag.name)
  );

  if (userTagNames.length === 0) {
    return getTrendingListings(userId);
  }

  const where: any = {
    status: "ACTIVE",
    userId: { not: userId },
    tags: {
      some: {
        name: { in: userTagNames },
      },
    },
  };

  // Filter out blocked users
  if (blockedUserIds.length > 0) {
    where.userId = {
      not: userId,
      notIn: blockedUserIds,
    };
  }

  return client.listing.findMany({
    where,
    include: {
      tags: true,
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          displayName: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
}

async function getListingsBasedOnViewed(userId: string) {
  // Get blocked user IDs
  const blockedUserIds = await getBlockedUserIds(userId);

  // This would require tracking listing views - for now, return recent listings
  // In a real implementation, you'd track user listing views and find similar items
  const where: any = {
    status: "ACTIVE",
    userId: { not: userId },
  };

  // Filter out blocked users
  if (blockedUserIds.length > 0) {
    where.userId = {
      not: userId,
      notIn: blockedUserIds,
    };
  }

  return client.listing.findMany({
    where,
    include: {
      tags: true,
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          displayName: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
}

async function getListingsBasedOnSearches(userId: string) {
  // Get blocked user IDs
  const blockedUserIds = await getBlockedUserIds(userId);

  // This would require tracking search history - for now, return popular items
  // In a real implementation, you'd track user searches and find matching listings
  const where: any = {
    status: "ACTIVE",
    userId: { not: userId },
  };

  // Filter out blocked users
  if (blockedUserIds.length > 0) {
    where.userId = {
      not: userId,
      notIn: blockedUserIds,
    };
  }

  return client.listing.findMany({
    where,
    include: {
      tags: true,
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          displayName: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
}

async function getTrendingListings(userId?: string) {
  const where: any = {
    status: "ACTIVE",
  };

  // Filter out blocked users if authenticated
  if (userId) {
    const blockedUserIds = await getBlockedUserIds(userId);
    if (blockedUserIds.length > 0) {
      where.userId = {
        notIn: blockedUserIds,
      };
    }
  }

  return client.listing.findMany({
    where,
    include: {
      tags: true,
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          displayName: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
}

async function getRecentListings(limit: number, userId?: string) {
  const where: any = {
    status: "ACTIVE",
  };

  // Filter out blocked users if authenticated
  if (userId) {
    const blockedUserIds = await getBlockedUserIds(userId);
    if (blockedUserIds.length > 0) {
      where.userId = {
        notIn: blockedUserIds,
      };
    }
  }

  return client.listing.findMany({
    where,
    include: {
      tags: true,
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          displayName: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

async function getTopCategories() {
  const tagStats = await client.tag.findMany({
    include: {
      _count: {
        select: {
          listings: true,
        },
      },
    },
    orderBy: {
      listings: {
        _count: "desc",
      },
    },
    take: 10,
  });

  return tagStats.map((tag) => ({
    name: tag.name,
    count: tag._count.listings,
  }));
}

// Helper function to get blocked user IDs
async function getBlockedUserIds(userId: string): Promise<string[]> {
  const blockedRelations = await client.blockedUser.findMany({
    where: {
      OR: [{ blockerId: userId }, { blockedId: userId }],
    },
    select: {
      blockerId: true,
      blockedId: true,
    },
  });

  const blockedUserIds = new Set<string>();
  blockedRelations.forEach((relation) => {
    if (relation.blockerId === userId) {
      blockedUserIds.add(relation.blockedId);
    } else {
      blockedUserIds.add(relation.blockerId);
    }
  });

  return Array.from(blockedUserIds);
}
