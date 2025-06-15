"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate, getProfileImageUrl } from "@/lib/utils";
import ListingCard from "@/components/listing/ListingCard";
import { PlusCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Type for serializable Clerk user data
type SerializableClerkUser = {
  id: string;
  imageUrl?: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
} | null;

type PrivateProfileProps = {
  user: any; // Type this properly based on your actual user structure
  listings: any[]; // Type this properly based on your actual listing structure
  clerkUser?: SerializableClerkUser; // Serializable Clerk user data for image fallback
};

type TabType = "selling" | "favorites" | "closet" | "reviews";

const PrivateProfileView = ({
  user,
  listings,
  clerkUser,
}: PrivateProfileProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("selling");

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

  // Get the profile image URL with Clerk fallback
  const profileImageUrl = getProfileImageUrl(user.image, clerkUser);
  const tabs = [
    { id: "selling", label: "Selling", count: activeListings.length },
    { id: "favorites", label: "Favorites", count: 0 },
    { id: "closet", label: "Closet", count: listings.length },
    { id: "reviews", label: "Reviews", count: 0 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "selling":
        return (
          <div className="space-y-6">
            {" "}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Active Listings</h3>
              <Link href="/create-listing">
                <Button size="sm" className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  New Listing
                </Button>
              </Link>
            </div>
            {activeListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
              <div className="text-center py-12">
                {" "}
                <p className="text-gray-500 mb-4">
                  You don't have any active listings.
                </p>
                <Link href="/create-listing">
                  <Button>Create Your First Listing</Button>
                </Link>
              </div>
            )}
            {soldListings.length > 0 && (
              <details className="mt-8">
                <summary className="text-lg font-medium cursor-pointer mb-4 text-gray-700">
                  Sold Items ({soldListings.length})
                </summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
            {archivedListings.length > 0 && (
              <details className="mt-8">
                <summary className="text-lg font-medium cursor-pointer mb-4 text-gray-700">
                  Archived Items ({archivedListings.length})
                </summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        );
      case "closet":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">My Closet</h3>
            {listings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    showPrivateIndicator={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Your closet is empty.</p>
              </div>
            )}
          </div>
        );
      case "favorites":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Favorites</h3>
            <div className="text-center py-12">
              <p className="text-gray-500">No favorites yet.</p>
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Reviews</h3>
            <div className="text-center py-12">
              <p className="text-gray-500">No reviews yet.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Profile Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-gray-100">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={user.username || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-600">
                    {user.username?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.username}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Member since {formatDate(user.createdAt)}
                  </p>
                </div>
                <Link href={`/settings/${user.username}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-4 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">
                    {activeListings.length}
                  </span>
                  <span className="text-gray-600">listings</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">
                    {soldListings.length}
                  </span>
                  <span className="text-gray-600">traded</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">
                    {listings.length}
                  </span>
                  <span className="text-gray-600">items</span>
                </div>
                {privateListings > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">
                      {privateListings}
                    </span>
                    <span className="text-gray-600">private</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors",
                  activeTab === tab.id
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default PrivateProfileView;
