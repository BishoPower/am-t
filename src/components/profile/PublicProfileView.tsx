"use client";
import React, { useState } from "react";
import Image from "next/image";
import { formatDate, getProfileImageUrl } from "@/lib/utils";
import ListingCard from "@/components/listing/ListingCard";
import { ReviewsList } from "@/components/reviews";
import { useReviewsCount } from "@/hooks/use-reviews-count";
import { cn } from "@/lib/utils";
import BlockUserButton from "@/components/user/BlockUserButton";
import { useAuth } from "@clerk/nextjs";

// Type for serializable Clerk user data
type SerializableClerkUser = {
  id: string;
  imageUrl?: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
} | null;

type PublicProfileProps = {
  user: any; // Type this properly based on your actual user structure
  listings: any[]; // Type this properly based on your actual listing structure
  clerkUser?: SerializableClerkUser; // Serializable Clerk user data for image fallback
  isBlocked?: boolean; // Whether the users have blocked each other
};

type TabType = "closet" | "reviews";

const PublicProfileView = ({
  user,
  listings,
  clerkUser,
  isBlocked = false,
}: PublicProfileProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("closet");
  const { count: reviewsCount } = useReviewsCount(user.id);
  const { userId } = useAuth();
  // Get the profile image URL with Clerk fallback
  const profileImageUrl = getProfileImageUrl(user.image, clerkUser);

  // Check if this is the current user's own profile
  // Compare the profile user's clerkid with the current user's userId
  const isOwnProfile = user.clerkid === userId;
  const tabs = [
    { id: "closet", label: "Closet", count: isBlocked ? 0 : listings.length },
    { id: "reviews", label: "Reviews", count: isBlocked ? 0 : reviewsCount },
  ];
  const renderTabContent = () => {
    switch (activeTab) {
      case "closet":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Closet</h3>
            {isBlocked ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-600 mb-4">
                      Content is not available because you have blocked each
                      other.
                    </p>
                    <p className="text-sm text-gray-500">
                      You can unblock this user using the button above if you
                      want to see their content.
                    </p>
                  </div>
                </div>
              </div>
            ) : listings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No public listings available.</p>
              </div>
            )}
          </div>
        );
      case "reviews":
        return (
          <div className="space-y-6">
            {isBlocked ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-600 mb-4">
                      Reviews are not available because you have blocked each
                      other.
                    </p>
                    <p className="text-sm text-gray-500">
                      You can unblock this user using the button above if you
                      want to see their reviews.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <ReviewsList revieweeId={user.id} showTitle={false} />
            )}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="w-full">
      {/* Profile Header */}
      <div className="bg-white border-b p-6 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.displayName || user.username}
                </h1>
                {user.displayName && (
                  <p className="text-gray-500 text-sm">@{user.username}</p>
                )}
                {user.bio && (
                  <p className="text-gray-700 text-sm mt-2 max-w-md">
                    {user.bio}
                  </p>
                )}
                {user.location && (
                  <p className="text-gray-600 text-sm mt-1">
                    📍 {user.location}
                  </p>
                )}{" "}
                <p className="text-gray-600 text-sm mt-1">
                  Member since {formatDate(user.createdAt)}
                </p>
                {/* Block button for other users */}
                {!isOwnProfile && userId && (
                  <div className="mt-3">
                    <BlockUserButton
                      userId={user.id}
                      username={user.username}
                      displayName={
                        user.displayName ||
                        `${user.firstName || ""} ${user.lastName || ""}`.trim()
                      }
                      variant="outline"
                      size="sm"
                    />
                  </div>
                )}
              </div>{" "}
              {/* Public profile stats */}
              <div className="mt-4 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">
                    {isBlocked ? 0 : listings.length}
                  </span>{" "}
                  <span className="text-gray-600">items</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b mb-6">
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
                )}{" "}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default PublicProfileView;
