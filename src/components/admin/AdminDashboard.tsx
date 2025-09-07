"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Shield,
  Ban,
  Search,
  UserCheck,
  AlertTriangle,
  FileText,
  Package,
  Eye,
  EyeOff,
} from "lucide-react";
import AdminUserControls from "@/components/admin/AdminUserControls";

interface User {
  id: string;
  username: string;
  displayName?: string;
  clerkId: string;
  isAdmin: boolean;
  isBanned?: boolean;
  banReason?: string;
  bannedAt?: string;
  banExpiresAt?: string;
  createdAt: string;
  _count: {
    listings: number;
    editorials: number;
    trades: number;
  };
}

interface Listing {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  isPrivate: boolean;
  status: "ACTIVE" | "SOLD" | "REMOVED";
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    displayName: string | null;
    image: string | null;
  };
  _count: {
    favorites: number;
    messages: number;
  };
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [listingsLoading, setListingsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [listingSearchTerm, setListingSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "admins" | "banned">("all");
  const [listingFilter, setListingFilter] = useState<
    "all" | "active" | "sold" | "removed" | "private"
  >("all");

  useEffect(() => {
    fetchUsers();
    fetchListings();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filter]);

  useEffect(() => {
    filterListings();
  }, [listings, listingSearchTerm, listingFilter]);

  const fetchUsers = async () => {
    try {
      // Use dedicated dashboard endpoint to get all users
      const response = await fetch("/api/admin/dashboard/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchListings = async () => {
    try {
      setListingsLoading(true);
      const response = await fetch("/api/admin/listings");
      if (!response.ok) throw new Error("Failed to fetch listings");
      const data = await response.json();
      setListings(data.listings);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setListingsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Apply text search
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filter === "admins") {
      filtered = filtered.filter((user) => user.isAdmin);
    } else if (filter === "banned") {
      filtered = filtered.filter((user) => user.isBanned);
    }

    setFilteredUsers(filtered);
  };

  const filterListings = () => {
    let filtered = listings;

    // Apply text search
    if (listingSearchTerm) {
      filtered = filtered.filter(
        (listing) =>
          listing.title
            .toLowerCase()
            .includes(listingSearchTerm.toLowerCase()) ||
          listing.description
            .toLowerCase()
            .includes(listingSearchTerm.toLowerCase()) ||
          listing.user.username
            .toLowerCase()
            .includes(listingSearchTerm.toLowerCase()) ||
          listing.user.displayName
            ?.toLowerCase()
            .includes(listingSearchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (listingFilter === "active") {
      filtered = filtered.filter((listing) => listing.status === "ACTIVE");
    } else if (listingFilter === "sold") {
      filtered = filtered.filter((listing) => listing.status === "SOLD");
    } else if (listingFilter === "removed") {
      filtered = filtered.filter((listing) => listing.status === "REMOVED");
    } else if (listingFilter === "private") {
      filtered = filtered.filter((listing) => listing.isPrivate);
    }

    setFilteredListings(filtered);
  };

  const getStats = () => {
    const totalUsers = users.length;
    const adminUsers = users.filter((user) => user.isAdmin).length;
    const bannedUsers = users.filter((user) => user.isBanned).length;
    const regularUsers = totalUsers - adminUsers;
    return { totalUsers, adminUsers, bannedUsers, regularUsers };
  };

  const getListingStats = () => {
    const totalListings = listings.length;
    const activeListings = listings.filter(
      (listing) => listing.status === "ACTIVE"
    ).length;
    const soldListings = listings.filter(
      (listing) => listing.status === "SOLD"
    ).length;
    const privateListings = listings.filter(
      (listing) => listing.isPrivate
    ).length;
    return { totalListings, activeListings, soldListings, privateListings };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isExpiredBan = (user: User) => {
    if (!user.isBanned || !user.banExpiresAt) return false;
    return new Date(user.banExpiresAt) < new Date();
  };

  const handleDeleteListing = async (listingId: string) => {
    try {
      const response = await fetch(`/api/admin/listings/${listingId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from state
        setListings(listings.filter((listing) => listing.id !== listingId));
      } else {
        console.error("Failed to delete listing");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();
  const listingStats = getListingStats();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="listings" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Listing Management
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* User Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Admin Users</p>
                    <p className="text-2xl font-bold">{stats.adminUsers}</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Banned Users</p>
                    <p className="text-2xl font-bold">{stats.bannedUsers}</p>
                  </div>
                  <Ban className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Regular Users</p>
                    <p className="text-2xl font-bold">{stats.regularUsers}</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-gray-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users by username or display name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    onClick={() => setFilter("all")}
                    size="sm"
                  >
                    All Users
                  </Button>
                  <Button
                    variant={filter === "admins" ? "default" : "outline"}
                    onClick={() => setFilter("admins")}
                    size="sm"
                  >
                    Admins
                  </Button>
                  <Button
                    variant={filter === "banned" ? "default" : "outline"}
                    onClick={() => setFilter("banned")}
                    size="sm"
                  >
                    Banned
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User List */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {filteredUsers.length === 0 ? (
                  <p className="text-center text-gray-500">No users found</p>
                ) : (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="font-medium">
                              {user.displayName || user.username}
                            </h3>
                            {user.displayName && (
                              <p className="text-sm text-gray-500">
                                @{user.username}
                              </p>
                            )}
                          </div>

                          {/* Status Badges */}
                          <div className="flex gap-2">
                            {user.isAdmin && (
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                <Shield className="h-3 w-3" />
                                Admin
                              </Badge>
                            )}
                            {user.isBanned && (
                              <Badge
                                variant="destructive"
                                className="flex items-center gap-1"
                              >
                                <Ban className="h-3 w-3" />
                                Banned
                                {isExpiredBan(user) && (
                                  <span title="Ban has expired">
                                    <AlertTriangle className="h-3 w-3 ml-1" />
                                  </span>
                                )}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Joined:</span>{" "}
                            {formatDate(user.createdAt)}
                          </div>
                          <div>
                            <span className="font-medium">Listings:</span>{" "}
                            {user._count.listings}
                          </div>
                          <div>
                            <span className="font-medium">Editorials:</span>{" "}
                            {user._count.editorials}
                          </div>
                          <div>
                            <span className="font-medium">Trades:</span>{" "}
                            {user._count.trades}
                          </div>
                        </div>

                        {user.isBanned && user.banReason && (
                          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm">
                            <span className="font-medium text-red-800">
                              Ban Reason:
                            </span>{" "}
                            <span className="text-red-700">
                              {user.banReason}
                            </span>
                            {user.banExpiresAt && (
                              <div className="mt-1">
                                <span className="font-medium text-red-800">
                                  Expires:
                                </span>{" "}
                                <span className="text-red-700">
                                  {new Date(
                                    user.banExpiresAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <AdminUserControls targetUser={user} />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-6">
          {/* Listing Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Listings</p>
                    <p className="text-2xl font-bold">
                      {listingStats.totalListings}
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-2xl font-bold">
                      {listingStats.activeListings}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sold</p>
                    <p className="text-2xl font-bold">
                      {listingStats.soldListings}
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-gray-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Private</p>
                    <p className="text-2xl font-bold">
                      {listingStats.privateListings}
                    </p>
                  </div>
                  <EyeOff className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Listing Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search listings by title, description, or user..."
                      value={listingSearchTerm}
                      onChange={(e) => setListingSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={listingFilter === "all" ? "default" : "outline"}
                    onClick={() => setListingFilter("all")}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button
                    variant={listingFilter === "active" ? "default" : "outline"}
                    onClick={() => setListingFilter("active")}
                    size="sm"
                  >
                    Active
                  </Button>
                  <Button
                    variant={listingFilter === "sold" ? "default" : "outline"}
                    onClick={() => setListingFilter("sold")}
                    size="sm"
                  >
                    Sold
                  </Button>
                  <Button
                    variant={
                      listingFilter === "removed" ? "default" : "outline"
                    }
                    onClick={() => setListingFilter("removed")}
                    size="sm"
                  >
                    Removed
                  </Button>
                  <Button
                    variant={
                      listingFilter === "private" ? "default" : "outline"
                    }
                    onClick={() => setListingFilter("private")}
                    size="sm"
                  >
                    Private
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Listing List */}
          <Card>
            <CardContent className="p-4">
              {listingsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading listings...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredListings.length === 0 ? (
                    <p className="text-center text-gray-500">
                      No listings found
                    </p>
                  ) : (
                    filteredListings.map((listing) => (
                      <div
                        key={listing.id}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        {/* Listing Image */}
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          {listing.imageUrls[0] && (
                            <img
                              src={listing.imageUrls[0]}
                              alt={listing.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{listing.title}</h3>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {listing.description}
                              </p>
                            </div>

                            {/* Status Badges */}
                            <div className="flex gap-2 flex-shrink-0">
                              <Badge
                                variant={
                                  listing.status === "ACTIVE"
                                    ? "default"
                                    : listing.status === "SOLD"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {listing.status}
                              </Badge>
                              {listing.isPrivate && (
                                <Badge
                                  variant="outline"
                                  className="flex items-center gap-1"
                                >
                                  <EyeOff className="h-3 w-3" />
                                  Private
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>
                                By{" "}
                                <span className="font-medium">
                                  {listing.user.displayName ||
                                    listing.user.username}
                                </span>
                              </span>
                              <span>{formatDate(listing.createdAt)}</span>
                              <span>{listing._count.favorites} ♥</span>
                              <span>{listing._count.messages} messages</span>
                            </div>

                            {/* Admin Controls */}
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  window.open(
                                    `/listing/${listing.id}`,
                                    "_blank"
                                  )
                                }
                              >
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                onClick={() => {
                                  if (
                                    confirm(
                                      "Are you sure you want to delete this listing?"
                                    )
                                  ) {
                                    handleDeleteListing(listing.id);
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
