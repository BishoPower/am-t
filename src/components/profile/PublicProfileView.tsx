"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate, getProfileImageUrl } from "@/lib/utils";
import ListingCard from "@/components/listing/ListingCard";
import { ReviewsList } from "@/components/reviews";
import { useReviewsCount } from "@/hooks/use-reviews-count";
import { cn } from "@/lib/utils";
import BlockUserButton from "@/components/user/BlockUserButton";
import FriendRequestButton from "@/components/user/FriendRequestButton";
import { useAuth } from "@clerk/nextjs";
import { useIsAdmin } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminUserControls from "@/components/admin/AdminUserControls";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit, Eye, Shield } from "lucide-react";

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

type TabType = "closet" | "reviews" | "editorials";

const PublicProfileView = ({
  user,
  listings,
  clerkUser,
  isBlocked = false,
}: PublicProfileProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("closet");
  const [editorials, setEditorials] = useState<any[]>([]);
  const [editorialsLoading, setEditorialsLoading] = useState(false);
  const { count: reviewsCount } = useReviewsCount(user.id);
  const { userId } = useAuth();
  const { isAdmin } = useIsAdmin();

  // Get the profile image URL with Clerk fallback
  const profileImageUrl = getProfileImageUrl(user.image, clerkUser);

  // Check if this is the current user's own profile
  // Compare the profile user's clerkid with the current user's userId
  const isOwnProfile = user.clerkid === userId;

  // Fetch user's editorials
  useEffect(() => {
    const fetchEditorials = async () => {
      if (activeTab !== "editorials" || isBlocked) return;

      setEditorialsLoading(true);
      try {
        const response = await fetch(
          `/api/editorials?authorUsername=${user.username}`
        );
        if (response.ok) {
          const data = await response.json();
          setEditorials(data.editorials || []);
        }
      } catch (error) {
        console.error("Failed to fetch editorials:", error);
      } finally {
        setEditorialsLoading(false);
      }
    };

    fetchEditorials();
  }, [activeTab, user.username, isBlocked]);

  const tabs = [
    { id: "closet", label: "Closet", count: isBlocked ? 0 : listings.length },
    { id: "reviews", label: "Reviews", count: isBlocked ? 0 : reviewsCount },
    {
      id: "editorials",
      label: "Editorials",
      count: isBlocked ? 0 : editorials.length,
    },
  ];
  const renderTabContent = () => {
    switch (activeTab) {
      case "closet":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Closet</h3>
              {/* Show trading history privacy notice if applicable */}
              {!user.showTradingHistory && !isBlocked && (
                <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-md">
                  Trading history hidden by user
                </div>
              )}
            </div>
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
                <p className="text-gray-500">
                  {!user.showTradingHistory
                    ? "Only active listings are visible."
                    : "No public listings available."}
                </p>
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
      case "editorials":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Editorials</h3>
              {isOwnProfile && (
                <Link href="/editorial/create">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    + Create New Editorial
                  </button>
                </Link>
              )}
            </div>

            {isBlocked ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-600 mb-4">
                      Editorials are not available because you have blocked each
                      other.
                    </p>
                    <p className="text-sm text-gray-500">
                      You can unblock this user using the button above if you
                      want to see their editorials.
                    </p>
                  </div>
                </div>
              </div>
            ) : editorialsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading editorials...</p>
              </div>
            ) : editorials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {editorials.map((editorial) => (
                  <div
                    key={editorial.id}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                  >
                    {editorial.image && (
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={editorial.image}
                          alt={editorial.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {editorial.category}
                        </Badge>
                        {editorial.isStaffPicked && (
                          <Badge
                            variant="default"
                            className="text-xs bg-green-100 text-green-800"
                          >
                            Staff Pick ⭐
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {editorial.title}
                      </h3>

                      {editorial.subtitle && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {editorial.subtitle}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(editorial.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-3">
                          <span>❤️ {editorial.likes || 0}</span>
                          <span>💬 {editorial.comments || 0}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/editorial/article/${user.username}/${editorial.slug}`}
                          className="flex-1"
                        >
                          <button className="w-full bg-black text-white text-sm py-2 px-3 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-1">
                            <Eye className="h-3 w-3" />
                            Read
                          </button>
                        </Link>

                        {isOwnProfile && (
                          <Link
                            href={`/editorial/edit/${user.username}/${editorial.slug}`}
                          >
                            <button className="bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded hover:bg-gray-200 transition-colors flex items-center gap-1">
                              <Edit className="h-3 w-3" />
                              Edit
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  {isOwnProfile
                    ? "You haven't published any editorials yet."
                    : "No editorials published yet."}
                </p>
                {isOwnProfile && (
                  <Link href="/editorial/create">
                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                      Create Your First Editorial
                    </button>
                  </Link>
                )}
              </div>
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
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.displayName || user.username}
                  </h1>
                  {user.isAdmin && (
                    <Badge
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      <Shield className="h-3 w-3" />
                      Admin
                    </Badge>
                  )}
                </div>
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
                {/* Actions for other users */}
                {!isOwnProfile && userId && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <FriendRequestButton
                      targetUsername={user.username}
                      targetUserId={user.id}
                    />
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
                    {/* Admin Controls */}
                    {isAdmin && (
                      <AdminUserControls
                        targetUser={user}
                        isCurrentlyAdmin={user.isAdmin}
                      />
                    )}
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
