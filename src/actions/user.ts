"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

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

export const searchListings = async (query: string, key: string) => {
  try {
    const listings = await client.listing.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          {
            tags: { some: { name: { contains: query, mode: "insensitive" } } },
          },
        ],
        // Only include public, active listings in search results
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
      take: 20, // Limit results to prevent performance issues
    });

    return { status: 200, results: listings };
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
  