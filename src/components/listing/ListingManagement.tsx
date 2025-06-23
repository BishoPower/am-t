"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  Eye,
  EyeOff,
  Heart,
  Calendar,
  BarChart3,
  Users,
  Archive,
  Trash2,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ListingManagementProps {
  listing: any;
  stats: any;
}

const ListingManagement: React.FC<ListingManagementProps> = ({
  listing,
  stats,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(listing.status);
  const [isPrivate, setIsPrivate] = useState(listing.isPrivate);

  const mainImage = listing.imageUrls?.[0] || "/placeholder-image.jpg";

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/listings/${listing.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setCurrentStatus(newStatus);
        toast({
          title: "Status Updated",
          description: `Listing status changed to ${newStatus.toLowerCase()}`,
        });
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update listing status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleVisibilityToggle = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `/api/listings/${listing.id}/toggle-visibility`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        const updatedListing = await response.json();
        setIsPrivate(updatedListing.isPrivate);
        toast({
          title: "Visibility Updated",
          description: `Listing is now ${
            updatedListing.isPrivate ? "private" : "public"
          }`,
        });
      } else {
        throw new Error("Failed to toggle visibility");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update listing visibility",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/listings/${listing.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Listing Deleted",
          description: "Your listing has been permanently deleted",
        });
        router.push("/profile");
      } else {
        throw new Error("Failed to delete listing");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      });
    }
  };

  const copyListingUrl = () => {
    const url = `${window.location.origin}/listing/${listing.id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "Listing URL copied to clipboard",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "SOLD":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "ARCHIVED":
        return <Archive className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "SOLD":
        return "bg-blue-100 text-blue-800";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href={`/listing/${listing.id}`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listing
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Manage Listing</h1>
        <p className="text-gray-600 mt-2">
          Control your listing settings, visibility, and status
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Listing Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Listing Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={mainImage}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {listing.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {listing.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(currentStatus)}
                      <Badge className={getStatusColor(currentStatus)}>
                        {currentStatus}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {isPrivate ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="text-sm text-gray-600">
                        {isPrivate ? "Private" : "Public"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="justify-start">
                  <Link href={`/listing/${listing.id}/edit`}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Listing
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href={`/listing/${listing.id}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Public Page
                  </Link>
                </Button>
                <Button
                  onClick={copyListingUrl}
                  variant="outline"
                  className="justify-start"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Button
                  onClick={handleVisibilityToggle}
                  disabled={isUpdating}
                  variant="outline"
                  className="justify-start"
                >
                  {isPrivate ? (
                    <Eye className="h-4 w-4 mr-2" />
                  ) : (
                    <EyeOff className="h-4 w-4 mr-2" />
                  )}
                  {isPrivate ? "Make Public" : "Make Private"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle>Status Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    onClick={() => handleStatusChange("ACTIVE")}
                    disabled={isUpdating || currentStatus === "ACTIVE"}
                    variant={currentStatus === "ACTIVE" ? "default" : "outline"}
                    className="justify-start"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Active
                  </Button>
                  <Button
                    onClick={() => handleStatusChange("SOLD")}
                    disabled={isUpdating || currentStatus === "SOLD"}
                    variant={currentStatus === "SOLD" ? "default" : "outline"}
                    className="justify-start"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Sold
                  </Button>
                  <Button
                    onClick={() => handleStatusChange("ARCHIVED")}
                    disabled={isUpdating || currentStatus === "ARCHIVED"}
                    variant={
                      currentStatus === "ARCHIVED" ? "default" : "outline"
                    }
                    className="justify-start"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Change your listing status to control how it appears to other
                  users.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Permanently delete this listing. This action cannot be undone.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="justify-start">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Listing
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this listing? This
                        action cannot be undone and will permanently remove the
                        listing and all associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete Permanently
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-gray-600">Favorites</span>
                </div>
                <span className="font-semibold">
                  {listing._count.favorites}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Created</span>
                </div>
                <span className="text-sm font-medium">
                  {formatDate(listing.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">Updated</span>
                </div>
                <span className="text-sm font-medium">
                  {formatDate(listing.updatedAt)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Favorites */}
          {listing.favorites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {listing.favorites.slice(0, 5).map((favorite: any) => (
                    <div key={favorite.id} className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        {favorite.user.image ? (
                          <Image
                            src={favorite.user.image}
                            alt={favorite.user.username}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">
                              {favorite.user.username?.[0]?.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/profile/${favorite.user.username}`}
                        className="text-sm font-medium text-gray-900 hover:underline"
                      >
                        {favorite.user.username}
                      </Link>
                    </div>
                  ))}
                  {listing.favorites.length > 5 && (
                    <p className="text-xs text-gray-500 mt-2">
                      +{listing.favorites.length - 5} more
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {listing.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag: any) => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingManagement;
