import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { isOwnProfile } from "@/lib/auth-utils";
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
}: {
  params: { username: string };
}) {
  const { username } = await params;

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

  // Fetch the profile user
  const profileUser = await db.user.findUnique({
    where: { username },
    include: {
      closet: true,
    },
  });

  if (!profileUser) {
    return notFound();
  }

  // Fetch listings for this user's closet
  // For the owner, show all listings including private ones
  // For others, only show public, active listings
  const listings = await db.listing.findMany({
    where: {
      userId: profileUser.id,
      isPrivate: isOwner ? undefined : false, // Show all listings if own profile, only public listings for others
      status: isOwner ? undefined : "ACTIVE", // Show all statuses if own profile, only active if not
    },
    include: {
      tags: true,
      favorites: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (isOwner) {
    // Show the full private profile view
    return (
      <PrivateProfileView
        user={profileUser}
        listings={listings}
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
      />
    );
  }
}
