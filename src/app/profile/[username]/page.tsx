import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { isOwnProfile } from "@/lib/auth-utils";
import PrivateProfileView from "@/components/profile/PrivateProfileView";
import PublicProfileView from "@/components/profile/PublicProfileView";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  // Check if the logged-in user is viewing their own profile
  const isOwner = await isOwnProfile(params.username);

  // Fetch the profile user
  const profileUser = await db.user.findUnique({
    where: { username: params.username },
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
    return <PrivateProfileView user={profileUser} listings={listings} />;
  } else {
    // Show the limited public profile view
    return <PublicProfileView user={profileUser} listings={listings} />;
  }
}
