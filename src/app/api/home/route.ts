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

    // Get personalized recommendations
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
      getTrendingListings(),
      getRecentListings(12),
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
    return getTrendingListings();
  }

  return client.listing.findMany({
    where: {
      status: "ACTIVE",
      userId: { not: userId },
      tags: {
        some: {
          name: { in: userTagNames },
        },
      },
    },
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
  // This would require tracking listing views - for now, return recent listings
  // In a real implementation, you'd track user listing views and find similar items
  return client.listing.findMany({
    where: {
      status: "ACTIVE",
      userId: { not: userId },
    },
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
  // This would require tracking search history - for now, return popular items
  // In a real implementation, you'd track user searches and find matching listings
  return client.listing.findMany({
    where: {
      status: "ACTIVE",
      userId: { not: userId },
    },
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

async function getTrendingListings() {
  return client.listing.findMany({
    where: {
      status: "ACTIVE",
    },
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

async function getRecentListings(limit: number) {
  return client.listing.findMany({
    where: {
      status: "ACTIVE",
    },
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
