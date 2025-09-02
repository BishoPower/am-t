import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { isOwnProfile } from "@/lib/auth-utils";
import { checkProfileAccess } from "@/lib/privacy-utils";
import PrivateProfileView from "@/components/profile/PrivateProfileView";
import PublicProfileView from "@/components/profile/PublicProfileView";
import { currentUser } from "@clerk/nextjs/server";

// Type for serializable Clerk user data
type SerializableClerkUser = {
  id: string;
  imageUrl?: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
} | null;

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { tab?: string };
}) {
  const { username } = await params;
  const { tab } = await searchParams;

  // Check if the logged-in user is viewing their own profile
  const isOwner = await isOwnProfile(username);

  // Get Clerk user data for image fallback
  const clerkUser = await currentUser();

  // Extract only serializable data from Clerk user
  const serializableClerkUser: SerializableClerkUser = clerkUser
    ? {
        id: clerkUser.id,
        imageUrl: clerkUser.imageUrl,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        username: clerkUser.username,
      }
    : null;

  // Fetch the profile user with privacy settings
  const profileUser = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      displayName: true,
      clerkid: true,
      image: true,
      bio: true,
      location: true,
      profileVisibility: true,
      allowDirectMessages: true,
      showTradingHistory: true,
      createdAt: true,
      updatedAt: true,
      closet: {
        select: {
          id: true,
          // Add any other closet fields you need
        },
      },
    },
  });
  if (!profileUser) {
    return notFound();
  }

  // Check privacy settings using the utility function
  const profileAccess = await checkProfileAccess(username);

  if (!profileAccess.accessible && !isOwner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {profileAccess.reason === "Profile is private"
              ? "Private Profile"
              : profileAccess.reason === "Profile is only visible to friends"
              ? "Friends Only Profile"
              : "Profile Unavailable"}
          </h1>
          <p className="text-gray-600">
            {profileAccess.reason === "Profile is private"
              ? "This user has set their profile to private."
              : profileAccess.reason === "Profile is only visible to friends"
              ? "This profile is only visible to friends."
              : profileAccess.reason}
          </p>
        </div>
      </div>
    );
  }
  // Check if users have blocked each other (if viewer is authenticated and not viewing own profile)
  let isBlocked = false;
  if (clerkUser && !isOwner) {
    const currentDbUser = await db.user.findUnique({
      where: { clerkid: clerkUser.id },
      select: { id: true },
    });

    if (currentDbUser) {
      const blockExists = await db.blockedUser.findFirst({
        where: {
          OR: [
            { blockerId: currentDbUser.id, blockedId: profileUser.id },
            { blockerId: profileUser.id, blockedId: currentDbUser.id },
          ],
        },
      });

      isBlocked = !!blockExists;
    }
  }

  // Fetch listings for this user's closet
  // For the owner, show all listings including private ones and sold/traded items
  // For others, respect privacy settings - hide sold/traded items if showTradingHistory is false
  // If users have blocked each other, show empty array

  let listingStatusFilter: any = undefined;

  if (!isOwner) {
    // For public profiles, respect the showTradingHistory setting
    if (profileUser.showTradingHistory) {
      // Show all statuses (ACTIVE, SOLD, ARCHIVED)
      listingStatusFilter = undefined;
    } else {
      // Only show active listings, hide sold/traded items
      listingStatusFilter = "ACTIVE";
    }
  }

  const listings = isBlocked
    ? []
    : await db.listing.findMany({
        where: {
          userId: profileUser.id,
          isPrivate: isOwner ? undefined : false, // Show all listings if own profile, only public listings for others
          status: isOwner ? undefined : listingStatusFilter, // Respect trading history privacy for others
        },
        include: {
          tags: true,
          _count: {
            select: {
              favorites: true,
            },
          },
        },
        orderBy: [
          {
            order: "asc", // Sort by custom order first
          },
          {
            createdAt: "desc", // Then by creation date for items without order
          },
        ],
      });

  // Fetch favorites only for the profile owner
  let favorites: any[] | undefined = [];
  if (isOwner && !isBlocked) {
    // Get the current user's blocked user IDs
    const blockedUserIds = await db.blockedUser.findMany({
      where: {
        OR: [{ blockerId: profileUser.id }, { blockedId: profileUser.id }],
      },
      select: {
        blockerId: true,
        blockedId: true,
      },
    });

    // Extract the IDs of users who are blocked or have blocked the current user
    const blockedIds = new Set<string>();
    blockedUserIds.forEach((block) => {
      if (block.blockerId === profileUser.id) {
        blockedIds.add(block.blockedId);
      } else {
        blockedIds.add(block.blockerId);
      }
    });

    favorites = await db.favorite.findMany({
      where: {
        userId: profileUser.id,
        listing: {
          userId: {
            notIn: Array.from(blockedIds), // Exclude listings from blocked users
          },
        },
      },
      include: {
        listing: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                image: true,
              },
            },
            tags: true,
            _count: {
              select: {
                favorites: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "desc", // Most recently favorited first
      },
    });
  }

  if (isOwner) {
    // Show the full private profile view
    return (
      <PrivateProfileView
        user={profileUser}
        listings={listings}
        favorites={favorites}
        clerkUser={serializableClerkUser}
      />
    );
  } else {
    // Show the limited public profile view
    return (
      <PublicProfileView
        user={profileUser}
        listings={listings}
        clerkUser={serializableClerkUser}
        isBlocked={isBlocked}
      />
    );
  }
}
