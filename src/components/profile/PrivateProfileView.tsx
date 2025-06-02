import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import ListingCard from "@/components/listing/ListingCard";
import { PlusCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

type PrivateProfileProps = {
  user: any; // Type this properly based on your actual user structure
  listings: any[]; // Type this properly based on your actual listing structure
};

const PrivateProfileView = ({ user, listings }: PrivateProfileProps) => {
  // Group listings by status
  const activeListings = listings.filter(
    (listing) => listing.status === "ACTIVE"
  );
  const soldListings = listings.filter((listing) => listing.status === "SOLD");
  const archivedListings = listings.filter(
    (listing) => listing.status === "ARCHIVED"
  );

  // Count private listings
  const privateListings = listings.filter(
    (listing) => listing.isPrivate
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Private Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="relative h-24 w-24 rounded-full overflow-hidden">
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.username || "User"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">
                {user.username?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-gray-600">
                Member since {formatDate(user.createdAt)}
              </p>
            </div>

            <Link href="/dashboard/settings">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Settings className="h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          </div>

          {/* Private profile stats */}
          <div className="mt-3 flex flex-wrap gap-4">
            <div>
              <span className="font-medium">{activeListings.length}</span>{" "}
              active
            </div>
            <div>
              <span className="font-medium">{soldListings.length}</span> sold
            </div>
            <div>
              <span className="font-medium">{archivedListings.length}</span>{" "}
              archived
            </div>
            <div>
              <span className="font-medium">{privateListings}</span> private
            </div>
          </div>
        </div>
      </div>

      {/* My Closet Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {user.closet?.name || "My Closet"}
          </h2>
          <Link href="/dashboard/listings/new">
            <Button className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              New Listing
            </Button>
          </Link>
        </div>

        {/* Active Listings */}
        <h3 className="text-lg font-medium mb-3">Active Listings</h3>
        {activeListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {activeListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                showPrivateIndicator={true}
                showEditOptions={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-8">
            You don't have any active listings.
          </p>
        )}

        {/* Sold Listings (collapsed by default) */}
        {soldListings.length > 0 && (
          <details className="mb-6">
            <summary className="text-lg font-medium cursor-pointer mb-3">
              Sold Listings ({soldListings.length})
            </summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
              {soldListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  showPrivateIndicator={true}
                />
              ))}
            </div>
          </details>
        )}

        {/* Archived Listings (collapsed by default) */}
        {archivedListings.length > 0 && (
          <details>
            <summary className="text-lg font-medium cursor-pointer mb-3">
              Archived Listings ({archivedListings.length})
            </summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {archivedListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  showPrivateIndicator={true}
                />
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

export default PrivateProfileView;
