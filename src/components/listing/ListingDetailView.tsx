"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Share2,
  Flag,
  MapPin,
  Calendar,
  User,
  Package,
  ArrowLeft,
  MessageCircle,
  Repeat2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatDate, getProfileImageUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

type ListingDetailProps = {
  listing: any; // Type this properly based on your listing structure
  isOwner: boolean; // Whether current user owns this listing
  isFavorited: boolean; // Whether current user has favorited this listing
  favoriteCount: number; // Total number of favorites
};

const ListingDetailView = ({
  listing,
  isOwner,
  isFavorited: initialIsFavorited,
  favoriteCount: initialFavoriteCount,
}: ListingDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);

  // Get profile image with fallback
  const sellerProfileImage = getProfileImageUrl(listing.user.image);
  const handleFavorite = async () => {
    // Only allow favoriting if user is not the owner
    if (isOwner) {
      return;
    }

    try {
      const response = await fetch(`/api/listings/${listing.id}/favorite`, {
        method: isFavorited ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsFavorited(!isFavorited);
        setFavoriteCount((prev) => (isFavorited ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error("Error favoriting listing:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          text: listing.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/profile/${listing.user.username}`}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {listing.imageUrls?.map((imageUrl: string, index: number) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={`${listing.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {listing.imageUrls?.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>

            {/* Thumbnail navigation */}
            {listing.imageUrls?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {listing.imageUrls.map((imageUrl: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "flex-shrink-0 w-16 h-16 relative overflow-hidden rounded-md border-2",
                      selectedImageIndex === index
                        ? "border-black"
                        : "border-gray-200"
                    )}
                  >
                    <Image
                      src={imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Listing Details */}
          <div className="space-y-6">
            {" "}
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {listing.title}
              </h1>
            </div>
            {/* Status and Private indicators */}
            <div className="flex gap-2">
              <Badge
                variant={listing.status === "ACTIVE" ? "default" : "secondary"}
                className="uppercase"
              >
                {listing.status}
              </Badge>
              {listing.isPrivate && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  Private
                </Badge>
              )}
            </div>
            {/* Tags */}
            {listing.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {listing.tags.map((tag: any) => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
            {/* Description */}
            {listing.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>
            )}
            <Separator />
            {/* Seller Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Seller</h3>
              <Link
                href={`/profile/${listing.user.username}`}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  {sellerProfileImage ? (
                    <Image
                      src={sellerProfileImage}
                      alt={listing.user.username || "Seller"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    @{listing.user.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    {listing.user.firstName} {listing.user.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Member since {formatDate(listing.user.createdAt)}
                  </p>
                </div>
              </Link>
            </div>
            {/* Action Buttons */}
            {!isOwner && (
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Seller
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={handleFavorite}
                    className={cn(
                      "flex items-center gap-2",
                      isFavorited && "text-red-500 border-red-500"
                    )}
                  >
                    <Heart
                      className={cn("h-4 w-4", isFavorited && "fill-current")}
                    />
                    {isFavorited ? "Favorited" : "Favorite"}
                  </Button>

                  <Button variant="outline" className="flex items-center gap-2">
                    <Repeat2 className="h-4 w-4" />
                    Trade
                  </Button>
                </div>
              </div>
            )}
            {/* Owner Actions */}
            {isOwner && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 text-center py-2">
                  This is your listing
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" asChild>
                    <Link href={`/settings/listings/${listing.id}/edit`}>
                      Edit Listing
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/settings/listings/${listing.id}/manage`}>
                      Manage
                    </Link>
                  </Button>
                </div>
              </div>
            )}
            {/* Listing Stats */}{" "}
            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{favoriteCount} favorites</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Listed {formatDate(listing.createdAt)}</span>
              </div>
            </div>
            {/* Trade Preferences */}
            {listing.tradePreferences?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Trade Preferences
                </h3>
                <div className="space-y-2">
                  {listing.tradePreferences.map((preference: any) => (
                    <div
                      key={preference.id}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
                    >
                      {preference.imageUrl && (
                        <div className="relative h-12 w-12 rounded overflow-hidden">
                          <Image
                            src={preference.imageUrl}
                            alt={preference.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{preference.title}</p>
                        {preference.notes && (
                          <p className="text-sm text-gray-600">
                            {preference.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailView;
