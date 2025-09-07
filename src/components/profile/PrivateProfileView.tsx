"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate, getProfileImageUrl } from "@/lib/utils";
import ListingCard from "@/components/listing/ListingCard";
import DraggableListingsGrid from "@/components/listing/DraggableListingsGrid";
import TradeInbox from "@/components/trade/TradeInbox";
import CompletedTrades from "@/components/trade/CompletedTrades";
import MessagesInbox from "@/components/messaging/MessagesInbox";
import { ReviewsList } from "@/components/reviews";
import { useReviewsCount } from "@/hooks/use-reviews-count";
import {
  PlusCircle,
  Settings,
  Clock,
  CheckCircle,
  FileText,
  Calendar,
  Edit,
  Eye,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Spinner from "@/components/global/loader/spinner";
import { useIsAdmin } from "@/hooks/use-admin";
import AdminDashboard from "@/components/admin/AdminDashboard";

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
  favorites?: any[]; // Array of favorite objects with listing details
  clerkUser?: SerializableClerkUser; // Serializable Clerk user data for image fallback
};

type TabType =
  | "closet"
  | "favorites"
  | "reviews"
  | "trades"
  | "messages"
  | "editorials"
  | "admin";

const PrivateProfileView = ({
  user,
  listings,
  favorites = [],
  clerkUser,
}: PrivateProfileProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tabParam = searchParams.get("tab") as TabType;
  const [activeTab, setActiveTab] = useState<TabType>(tabParam || "closet");
  const [pendingTradesCount, setPendingTradesCount] = useState(0);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [tabLoading, setTabLoading] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [editorials, setEditorials] = useState<any[]>([]);
  const [editorialsLoading, setEditorialsLoading] = useState(false);
  const { userId } = useAuth();
  const { isAdmin } = useIsAdmin();

  // Get reviews count for this user
  const { count: reviewsCount } = useReviewsCount(user.id);

  // Fetch pending trade requests count
  const fetchPendingTradesCount = useCallback(async () => {
    if (!userId) return;

    // Don't fetch trade count if trading history is disabled
    if (!user.showTradingHistory) {
      setPendingTradesCount(0);
      return;
    }

    try {
      const response = await fetch("/api/trade/requests");
      if (response.ok) {
        const data = await response.json();
        const pendingReceived =
          data.received?.filter((req: any) => req.status === "PENDING")
            .length || 0;
        setPendingTradesCount(pendingReceived);
      }
    } catch (error) {
      console.error("Failed to fetch pending trades count:", error);
    }
  }, [userId, user.showTradingHistory]);

  useEffect(() => {
    fetchPendingTradesCount();
  }, [fetchPendingTradesCount]);
  // Fetch unread messages count
  const fetchUnreadMessagesCount = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch("/api/messages/unread-count");
      if (response.ok) {
        const data = await response.json();
        setUnreadMessagesCount(data.count || 0);
      }
    } catch (error) {
      console.error("Failed to fetch unread messages count:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUnreadMessagesCount();
  }, [fetchUnreadMessagesCount, activeTab]); // Refresh when switching to messages tab

  // Fetch user's editorials
  const fetchEditorials = useCallback(async () => {
    if (activeTab !== "editorials") return;

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
  }, [activeTab, user.username]);

  useEffect(() => {
    if (activeTab === "editorials") {
      fetchEditorials();
    }
  }, [activeTab, fetchEditorials]);

  // Update active tab when URL parameter changes (for browser navigation)
  useEffect(() => {
    // Only respond to URL changes when not already in a loading state
    // This prevents conflicts with our manual tab changes
    if (tabParam !== activeTab && !tabLoading) {
      let targetTab = tabParam || "closet";

      // If user tries to access trades tab but trading history is disabled, redirect to closet
      if (targetTab === "trades" && !user.showTradingHistory) {
        targetTab = "closet";
      }

      // Set loading state for URL-based tab changes
      setTabLoading(true);

      // Set specific loading state for favorites tab when coming from URL
      if (targetTab === "favorites") {
        setFavoritesLoading(true);
      }

      // Update tab immediately for URL changes
      setActiveTab(targetTab);

      // Clear loading states after brief delay
      setTimeout(() => {
        setTabLoading(false);
        if (targetTab === "favorites") {
          setFavoritesLoading(false);
        }
      }, 300);
    }
  }, [tabParam, user.showTradingHistory]); // Handle tab changes - update both state and URL
  const handleTabChange = (newTab: TabType) => {
    // Prevent switching if already loading
    if (tabLoading) return;

    // Prevent switching to trades tab if trading history is disabled
    if (newTab === "trades" && !user.showTradingHistory) {
      return;
    }

    // Update URL immediately
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newTab === "closet") {
      // Remove tab parameter for default tab
      newSearchParams.delete("tab");
    } else {
      newSearchParams.set("tab", newTab);
    }

    const newUrl =
      newSearchParams.toString() !== ""
        ? `${pathname}?${newSearchParams.toString()}`
        : pathname;

    router.push(newUrl, { scroll: false });

    // Set general loading state for all tab transitions
    setTabLoading(true);

    // Set specific loading state for favorites tab
    if (newTab === "favorites") {
      setFavoritesLoading(true);
    }

    // Update active tab after a brief delay to prevent content flash
    setTimeout(() => {
      setActiveTab(newTab);

      // Clear loading states
      setTimeout(() => {
        setTabLoading(false);
        if (newTab === "favorites") {
          setFavoritesLoading(false);
        }
      }, 200);
    }, 100);
  };

  // Group listings by status and sort by order
  const activeListings = listings
    .filter((listing) => listing.status === "ACTIVE")
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const soldListings = listings
    .filter((listing) => listing.status === "SOLD")
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const archivedListings = listings
    .filter((listing) => listing.status === "ARCHIVED")
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Count private listings
  const privateListings = listings.filter(
    (listing) => listing.isPrivate
  ).length;

  // Get the profile image URL with Clerk fallback
  const profileImageUrl = getProfileImageUrl(user.image, clerkUser);

  // Build tabs array based on privacy settings
  const tabs = [
    { id: "closet", label: "Closet", count: listings.length },
    { id: "favorites", label: "Favorites", count: favorites.length },
    { id: "editorials", label: "Editorials", count: editorials.length },
    // Only show trades tab if trading history is enabled
    ...(user.showTradingHistory
      ? [{ id: "trades", label: "Trades", count: pendingTradesCount }]
      : []),
    { id: "messages", label: "Messages", count: unreadMessagesCount },
    { id: "reviews", label: "Reviews", count: reviewsCount },
    // Only show admin tab if user is admin
    ...(isAdmin ? [{ id: "admin", label: "Admin Panel", count: 0 }] : []),
  ];
  const renderTabContent = () => {
    switch (activeTab) {
      case "closet":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">My Closet</h3>
              <Link href="/create-listing">
                <Button size="sm" className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  New Listing
                </Button>
              </Link>
            </div>{" "}
            {activeListings.length > 0 ? (
              <DraggableListingsGrid
                listings={activeListings}
                showPrivateIndicator={true}
                showEditOptions={true}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  You don't have any active listings.
                </p>
                <Link href="/create-listing">
                  <Button>Create Your First Listing</Button>
                </Link>
              </div>
            )}{" "}
            {/* Only show traded items if trading history is enabled */}
            {user.showTradingHistory && soldListings.length > 0 && (
              <details className="mt-8">
                <summary className="text-lg font-medium cursor-pointer mb-4 text-gray-700">
                  Traded Items ({soldListings.length})
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
      case "favorites":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Favorites</h3>
            {favoritesLoading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner size={48} color="#000000" />
              </div>
            ) : favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {favorites.map((favorite) => (
                  <ListingCard key={favorite.id} listing={favorite.listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No favorites yet.</p>
              </div>
            )}
          </div>
        );
      case "trades":
        // Only render trades content if trading history is enabled
        if (!user.showTradingHistory) {
          return (
            <div className="text-center py-12">
              <p className="text-gray-500">Trading history is not visible.</p>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="active" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Active Trades
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Completed
                </TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="mt-6">
                <TradeInbox onTradeUpdate={fetchPendingTradesCount} />
              </TabsContent>
              <TabsContent value="completed" className="mt-6">
                <CompletedTrades />
              </TabsContent>
            </Tabs>
          </div>
        );
      case "messages":
        return (
          <div className="space-y-6">
            <MessagesInbox onMessagesRead={fetchUnreadMessagesCount} />
          </div>
        );
      case "reviews":
        return (
          <div className="space-y-6">
            <ReviewsList revieweeId={user.id} showTitle={false} />
          </div>
        );
      case "editorials":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">My Editorials</h3>
              <Link href="/editorial/create">
                <Button size="sm" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  New Editorial
                </Button>
              </Link>
            </div>

            {editorialsLoading ? (
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
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-white">
                        <Image
                          src={editorial.image}
                          alt={editorial.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {editorial.category}
                        </Badge>
                        <div className="flex items-center gap-2">
                          {editorial.isStaffPicked && (
                            <Badge
                              variant="default"
                              className="text-xs bg-green-100 text-green-800"
                            >
                              Staff Pick ⭐
                            </Badge>
                          )}
                          {!editorial.published && (
                            <Badge
                              variant="outline"
                              className="text-xs text-gray-600"
                            >
                              Draft
                            </Badge>
                          )}
                        </div>
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
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            {editorial.published ? "View" : "Preview"}
                          </Button>
                        </Link>

                        <Link
                          href={`/editorial/edit/${user.username}/${editorial.slug}`}
                        >
                          <Button size="sm" className="px-3">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  You haven't published any editorials yet.
                </p>
                <Link href="/editorial/create">
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Create Your First Editorial
                  </Button>
                </Link>
              </div>
            )}
          </div>
        );
      case "admin":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg border border-red-500 bg-red-50">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Admin Panel</h3>
                <p className="text-gray-600 text-sm">
                  Manage users, editorials, and site content
                </p>
              </div>
            </div>
            <AdminDashboard />
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
            </div>{" "}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
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
                  )}
                  <p className="text-gray-600 text-sm mt-1">
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
                {/* Only show traded count if trading history is enabled */}
                {user.showTradingHistory && (
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">
                      {soldListings.length}
                    </span>
                    <span className="text-gray-600">traded</span>
                  </div>
                )}
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
                )}{" "}
              </div>{" "}
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
                onClick={() => handleTabChange(tab.id as TabType)}
                className={cn(
                  "flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors",
                  activeTab === tab.id
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                {" "}
                {tab.label}{" "}
                {tab.count > 0 && (
                  <span
                    className={cn(
                      "ml-2 px-2 py-0.5 text-xs rounded-full",
                      (tab.id === "trades" || tab.id === "messages") &&
                        tab.count > 0
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>{" "}
        </div>
      </div>{" "}
      {/* Tab Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {tabLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner size={48} color="#000000" />
            </div>
          ) : (
            renderTabContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateProfileView;
