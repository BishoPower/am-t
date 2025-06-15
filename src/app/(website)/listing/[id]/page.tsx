import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import ListingDetailView from "../../../../components/listing/ListingDetailView";

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // Debug logging
  console.log("Listing page ID parameter:", id);
  console.log("ID type:", typeof id);
  console.log("ID length:", id?.length);
  console.log("ID as JSON:", JSON.stringify(id));
  console.log(
    "ID char codes:",
    id ? Array.from(id).map((c) => c.charCodeAt(0)) : "null"
  );

  // Validate UUID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!id || !uuidRegex.test(id)) {
    console.error("Invalid UUID format:", id);
    console.error("Expected format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    return notFound();
  }
  // Get current user for favoriting and ownership checking
  const clerkUser = await currentUser();
  let currentUserDbId = null;

  if (clerkUser) {
    // Get the database user ID from Clerk ID
    const dbUser = await db.user.findUnique({
      where: { clerkid: clerkUser.id },
      select: { id: true },
    });
    currentUserDbId = dbUser?.id;
  }

  let listing;
  try {
    // Try a simple query first to isolate the issue
    console.log("About to query database with ID:", id);
    listing = await db.listing.findUnique({
      where: { id: id },
    });
    console.log("Simple query result:", listing ? "Found" : "Not found");

    if (!listing) {
      console.log("Listing not found with ID:", id);
      return notFound();
    }

    // Now fetch with full relations
    listing = await db.listing.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          },
        },
        tags: true,
        favorites: currentUserDbId
          ? {
              where: {
                userId: currentUserDbId,
              },
            }
          : undefined,
        tradePreferences: {
          include: {
            user: {
              select: {
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

    console.log(
      "Full query result:",
      listing ? "Found with relations" : "Not found"
    );
  } catch (error) {
    console.error("Database error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return notFound();
  }

  if (!listing) {
    return notFound();
  } // Transform the data for the component
  const isCurrentUserOwner = Boolean(
    currentUserDbId && listing.user.id === currentUserDbId
  );
  const isFavorited = Boolean(
    listing.favorites && listing.favorites.length > 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ListingDetailView
          listing={listing}
          isOwner={isCurrentUserOwner}
          isFavorited={isFavorited}
          favoriteCount={listing._count.favorites}
        />
      </div>
    </div>
  );
}
