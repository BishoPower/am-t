"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// Fix the verifyAccessToUser function to use findFirst instead of findUnique with OR
export const verifyAccessToUser = async (username: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, error: "No authenticated user found" };
    }

    const userExists = await client.user.findFirst({
      where: {
        username: username,
        OR: [
          { clerkid: user.id },
          {
            closet: {
              user: {
                clerkid: user.id,
              },
            },
          },
        ],
      },
      include: {
        closet: true,
      },
    });

    if (!userExists) {
      return { status: 404, error: "User not found" };
    }

    return {
      status: 200,
      data: { username: userExists },
    };
  } catch (error) {
    console.error("Error verifying access:", error);
    return {
      status: 500,
      error: "Failed to verify access",
    };
  }
};

// Fix getUserData to include proper error handling
export const getUserData = async (username: string) => {
  try {
    const userData = await client.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        bio: true,
        location: true,
        createdAt: true,
      },
    });

    return { status: 200, data: userData };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { status: 500, error: "Failed to fetch user data" };
  }
};

// Fix for getUserCloset
export const getUserCloset = async (username: string) => {
  try {
    const closet = await client.closet.findFirst({
      where: {
        user: {
          username,
        },
      },
      include: {
        _count: {
          select: {
            listings: true,
          },
        },
        listings: {
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            title: true,
            description: true,
            imageUrls: true, // This field exists in your schema
            createdAt: true,
          },
        },
      },
    });

    return { status: 200, data: closet };
  } catch (error) {
    console.error("Error fetching user closet:", error);
    return { status: 500, error: "Failed to fetch user closet" };
  }
};

// Fix getUserListings to match schema and include proper error handling
export const getUserListings = async (username: string) => {
  try {
    const user = await currentUser();

    const listings = await client.listing.findMany({
      where: {
        user: {
          username,
        },
      },
      // Can't mix include and select at top level
      include: {
        // Remove images: true
        tags: true,
        favorites: {
          ...(user && {
            where: {
              user: {
                clerkid: user.id,
              },
            },
          }),
          take: 1,
        },
        _count: {
          select: {
            favorites: true,
          },
        },
      },
      // Selecting specific fields needs a different approach
      // You'd need to use select with nested includes instead
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map the results to include imageUrls if needed
    const listingsWithImages = listings.map((listing) => ({
      ...listing,
      // Add any transformations if needed
    }));

    return { status: 200, data: listingsWithImages };
  } catch (error) {
    console.error("Error fetching user listings:", error);
    return { status: 500, error: "Failed to fetch user listings" };
  }
};

// Fix 1: getUserFavorites
export const getUserFavorites = async (username: string) => {
  try {
    const favorites = await client.favorite.findMany({
      where: {
        user: {
          username,
        },
      },
      include: {
        listing: {
          include: {
            // Remove this line: images: true,
            tags: true,
            user: {
              select: {
                username: true,
                image: true,
              },
            },
            closet: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        listing: {
          createdAt: "desc",
        },
      },
    });

    return { status: 200, data: favorites };
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return { status: 500, error: "Failed to fetch user favorites" };
  }
};

// Fix getMessagesReceived to include proper error handling
export const getMessagesReceived = async (username: string) => {
  try {
    const messages = await client.message.findMany({
      where: {
        to: {
          username,
        },
      },
      include: {
        from: {
          select: {
            username: true,
            image: true,
          },
        },
        listing: {
          select: {
            id: true,
            title: true,
            imageUrls: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    return { status: 200, data: messages };
  } catch (error) {
    console.error("Error fetching received messages:", error);
    return { status: 500, error: "Failed to fetch received messages" };
  }
};

// Fix getMessagesSent to include proper error handling
export const getMessagesSent = async (username: string) => {
  try {
    const messages = await client.message.findMany({
      where: {
        from: {
          username,
        },
      },
      include: {
        to: {
          select: {
            username: true,
            image: true,
          },
        },
        listing: {
          select: {
            id: true,
            title: true,
            imageUrls: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    return { status: 200, data: messages };
  } catch (error) {
    console.error("Error fetching sent messages:", error);
    return { status: 500, error: "Failed to fetch sent messages" };
  }
};

// Fix 2: getTradeRequestsSent
export const getTradeRequestsSent = async (username: string) => {
  try {
    const tradeRequests = await client.tradeRequest.findMany({
      where: {
        fromUser: {
          username,
        },
      },
      include: {
        toUser: {
          select: {
            username: true,
            image: true,
          },
        },
        initiatorListings: {
          // Remove this line: include: { images: true },
        },
        targetListings: {
          // Remove this line: include: { images: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { status: 200, data: tradeRequests };
  } catch (error) {
    console.error("Error fetching sent trade requests:", error);
    return { status: 500, error: "Failed to fetch sent trade requests" };
  }
};

// Fix 3: getTradeRequestsReceived
export const getTradeRequestsReceived = async (username: string) => {
  try {
    const tradeRequests = await client.tradeRequest.findMany({
      where: {
        toUser: {
          username,
        },
      },
      include: {
        fromUser: {
          select: {
            username: true,
            image: true,
          },
        },
        initiatorListings: {
          // Remove this line: include: { images: true },
        },
        targetListings: {
          // Remove this line: include: { images: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { status: 200, data: tradeRequests };
  } catch (error) {
    console.error("Error fetching received trade requests:", error);
    return { status: 500, error: "Failed to fetch received trade requests" };
  }
};

// Fix getUserTradePreferences to include proper error handling
export const getUserTradePreferences = async (username: string) => {
  try {
    const tradePreferences = await client.tradePreference.findMany({
      where: {
        user: {
          username,
        },
      },
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { status: 200, data: tradePreferences };
  } catch (error) {
    console.error("Error fetching trade preferences:", error);
    return { status: 500, error: "Failed to fetch trade preferences" };
  }
};
