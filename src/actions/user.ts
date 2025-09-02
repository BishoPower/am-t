"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@/generated/prisma";

type AuthResponse = {
  status: number;
  user?: any;
  error?: string;
};

export const onAuthenticatedUser = async (): Promise<AuthResponse> => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, error: "No authenticated user found" };
    }

    const userExists = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        closet: {
          include: {
            listings: true,
          },
        },
      },
    });

    if (userExists) {
      return { status: 200, user: userExists };
    }

    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username || `user-${user.id.slice(0, 8)}`,
        image: user.imageUrl,
        closet: {
          create: {
            name: `${user.username || "My"}'s Closet`,
          },
        },
      },
      include: {
        closet: {
          include: {
            listings: true,
          },
        },
      },
    });

    if (newUser) {
      return { status: 201, user: newUser };
    }

    return { status: 400, error: "Failed to create user" };
  } catch (error) {
    console.error("Authentication error:", error);
    return { status: 500, error: "Server error during authentication" };
  }
};

export const searchListings = async (
  query: string,
  key: string,
  tags?: string
) => {
  try {
    // Get current user for block filtering
    const user = await currentUser();
    let blockedUserIds: string[] = [];

    if (user) {
      const dbUser = await client.user.findUnique({
        where: { clerkid: user.id },
      });

      if (dbUser) {
        // Get blocked user IDs
        const blockedRelations = await client.blockedUser.findMany({
          where: {
            OR: [{ blockerId: dbUser.id }, { blockedId: dbUser.id }],
          },
          select: {
            blockerId: true,
            blockedId: true,
          },
        });

        const blockedUserIdsSet = new Set<string>();
        blockedRelations.forEach((relation) => {
          if (relation.blockerId === dbUser.id) {
            blockedUserIdsSet.add(relation.blockedId);
          } else {
            blockedUserIdsSet.add(relation.blockerId);
          }
        });

        blockedUserIds = Array.from(blockedUserIdsSet);
      }
    } // Handle tag-only search
    if (
      tags &&
      tags.trim().length > 0 &&
      (!query || query.trim().length === 0)
    ) {
      const tagNames = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const listings = await client.listing.findMany({
        where: {
          isPrivate: false,
          status: "ACTIVE",
          tags: {
            some: {
              name: { in: tagNames, mode: Prisma.QueryMode.insensitive },
            },
          },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              image: true,
              firstName: true,
              lastName: true,
            },
          },
          tags: true,
          favorites: {
            select: {
              id: true,
              userId: true,
            },
          },
          _count: {
            select: { favorites: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 50,
      });

      return { status: 200, results: listings };
    }

    if (!query || query.trim().length === 0) {
      // If no query, return recent listings
      const listings = await client.listing.findMany({
        where: {
          isPrivate: false,
          status: "ACTIVE",
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              image: true,
              firstName: true,
              lastName: true,
            },
          },
          tags: true,
          favorites: {
            select: {
              id: true,
              userId: true,
            },
          },
          _count: {
            select: { favorites: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 50,
      });

      return { status: 200, results: listings };
    }

    const searchTerms = query.toLowerCase().trim().split(/\s+/);

    // Build OR conditions for individual terms
    const titleConditions: Prisma.ListingWhereInput[] = searchTerms.map(
      (term) => ({
        title: { contains: term, mode: Prisma.QueryMode.insensitive },
      })
    );

    const descriptionConditions: Prisma.ListingWhereInput[] = searchTerms.map(
      (term) => ({
        description: { contains: term, mode: Prisma.QueryMode.insensitive },
      })
    );

    const tagConditions: Prisma.ListingWhereInput[] = searchTerms.map(
      (term) => ({
        tags: {
          some: {
            name: { contains: term, mode: Prisma.QueryMode.insensitive },
          },
        },
      })
    ); // Build the base where clause
    let whereClause: Prisma.ListingWhereInput = {
      OR: [
        { title: { contains: query, mode: Prisma.QueryMode.insensitive } },
        {
          description: {
            contains: query,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          tags: {
            some: {
              name: { contains: query, mode: Prisma.QueryMode.insensitive },
            },
          },
        },
        // Add individual term searches for better coverage
        ...titleConditions,
        ...descriptionConditions,
        ...tagConditions,
      ],
      // Only include public, active listings in search results
      isPrivate: false,
      status: "ACTIVE",
    };

    // Add tag filtering if tags are provided
    if (tags && tags.trim().length > 0) {
      const tagNames = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      whereClause = {
        AND: [
          whereClause,
          {
            tags: {
              some: {
                name: { in: tagNames, mode: Prisma.QueryMode.insensitive },
              },
            },
          },
        ],
      };
    }

    const listings = await client.listing.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
            firstName: true,
            lastName: true,
          },
        },
        tags: true,
        favorites: {
          select: {
            id: true,
            userId: true,
          },
        },
        _count: {
          select: { favorites: true },
        },
      },
      take: 100, // Get more results to score and sort
    });

    // Score listings based on relevance
    const scoredListings = listings.map((listing) => {
      let score = 0;
      const titleLower = listing.title.toLowerCase();
      const descriptionLower = (listing.description || "").toLowerCase();
      const tagNames = listing.tags.map((tag: any) => tag.name.toLowerCase());
      const queryLower = query.toLowerCase();

      // Exact title match (highest score)
      if (titleLower === queryLower) {
        score += 1000;
      }
      // Title starts with query
      else if (titleLower.startsWith(queryLower)) {
        score += 800;
      }
      // Title contains full query
      else if (titleLower.includes(queryLower)) {
        score += 600;
      }
      // Only check individual terms if we didn't get a full query match
      else {
        // Individual search terms in title
        searchTerms.forEach((term) => {
          if (titleLower.includes(term)) {
            score += 400;
          }
          if (titleLower.startsWith(term)) {
            score += 200;
          }
        });
      } // Tag matches (high priority)
      tagNames.forEach((tagName: string) => {
        if (tagName === queryLower) {
          score += 700;
        } else if (tagName.includes(queryLower)) {
          score += 500;
        }
        searchTerms.forEach((term) => {
          if (tagName.includes(term)) {
            score += 300;
          }
        });
      }); // Description matches (lower priority)
      if (descriptionLower.includes(queryLower)) {
        score += 200;
      }
      searchTerms.forEach((term) => {
        if (descriptionLower.includes(term)) {
          score += 100;
        }
      });

      // Boost popular items slightly
      score += (listing._count?.favorites || 0) * 2; // Boost newer items slightly
      const daysSinceCreated = Math.floor(
        (Date.now() - new Date(listing.createdAt).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (daysSinceCreated < 7) {
        score += 50;
      } else if (daysSinceCreated < 30) {
        score += 20;
      }

      return {
        ...listing,
        relevanceScore: score,
      };
    });

    // Simple but effective sorting: exact matches first, then by score
    const exactMatches: any[] = [];
    const otherMatches: any[] = [];

    scoredListings.forEach((listing) => {
      if (listing.title.toLowerCase() === query.toLowerCase()) {
        exactMatches.push(listing);
      } else if (listing.relevanceScore > 0) {
        otherMatches.push(listing);
      }
    });

    // Sort exact matches by score (in case there are multiple)
    exactMatches.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Sort other matches by score
    otherMatches.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Combine: exact matches first, then other matches
    const sortedListings = [...exactMatches, ...otherMatches]
      .slice(0, 50)
      .map(({ relevanceScore, ...listing }) => listing); // Remove score from response

    return { status: 200, results: sortedListings };
  } catch (error) {
    console.error("Error searching listings:", error);
    return { status: 500, error: "Failed to search listings" };
  }
};

export const searchUsers = async (query: string, key: string) => {
  try {
    const users = await client.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { firstName: { contains: query, mode: "insensitive" } },
          { lastName: { contains: query, mode: "insensitive" } },
          { bio: { contains: query, mode: "insensitive" } },
          { location: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        image: true,
        bio: true,
        location: true,
        createdAt: true,
        _count: {
          select: {
            listings: true,
            favorites: true,
          },
        },
      },
      orderBy: {
        username: "asc",
      },
      take: 20, // Limit results to prevent performance issues
    });

    return { status: 200, results: users };
  } catch (error) {
    console.error("Error searching users:", error);
    return { status: 500, error: "Failed to search users" };
  }
};
