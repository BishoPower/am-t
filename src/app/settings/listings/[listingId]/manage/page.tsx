import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isOwnProfile } from "@/lib/auth-utils";
import { currentUser } from "@clerk/nextjs/server";
import ListingManagement from "@/components/listing/ListingManagement";

export default async function ManageListingPage({
  params,
}: {
  params: { listingId: string };
}) {
  const { listingId } = await params;

  // Get current user
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/auth/sign-in");
  }

  // Fetch the listing with all related data
  const listing = await db.listing.findUnique({
    where: { id: listingId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
        },
      },
      tags: true,
      favorites: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          favorites: true,
        },
      },
    },
  });

  if (!listing) {
    return notFound();
  }

  // Check if the current user owns this listing
  if (listing.user.id !== clerkUser.id) {
    redirect(`/listing/${listingId}`);
  }

  // Get additional stats
  const stats = await db.listing.findUnique({
    where: { id: listingId },
    select: {
      createdAt: true,
      updatedAt: true,
      status: true,
      isPrivate: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <ListingManagement listing={listing} stats={stats} />
    </div>
  );
}
