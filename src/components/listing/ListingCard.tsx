import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, EyeOff, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ListingCardProps = {
  listing: any; // Type this properly based on your actual listing structure
  showPrivateIndicator?: boolean;
  showEditOptions?: boolean;
};

const ListingCard = ({
  listing,
  showPrivateIndicator = false,
  showEditOptions = false,
}: ListingCardProps) => {
  // Take first image as the main image
  const mainImage = listing.imageUrls?.[0] || "/placeholder-image.jpg";

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Image container with relative positioning for badges/icons */}
      <div className="relative aspect-square">
        <Link href={`/listing/${listing.id}`}>
          <div className="h-full w-full">
            <Image
              src={mainImage}
              alt={listing.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>

        {/* Private indicator */}
        {showPrivateIndicator && listing.isPrivate && (
          <div className="absolute top-2 left-2">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 bg-black/70 text-white"
            >
              <EyeOff className="h-3 w-3" />
              <span>Private</span>
            </Badge>
          </div>
        )}

        {/* Status badge for sold or archived items */}
        {listing.status !== "ACTIVE" && (
          <div className="absolute top-2 right-2">
            <Badge
              variant={listing.status === "SOLD" ? "default" : "secondary"}
              className="uppercase"
            >
              {listing.status}
            </Badge>
          </div>
        )}

        {/* Favorite count */}
        <div className="absolute bottom-2 right-2">
          <Badge
            variant="outline"
            className="bg-white/80 flex items-center gap-1"
          >
            <Heart className="h-3 w-3 fill-current" />
            <span>{listing.favorites?.length || 0}</span>
          </Badge>
        </div>
      </div>
      {/* Content */}{" "}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-sm line-clamp-1">
              {listing.title}
            </h3>
          </div>

          {/* Edit options dropdown */}
          {showEditOptions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/settings/listings/${listing.id}/edit`}>
                    Edit
                  </Link>
                </DropdownMenuItem>{" "}
                <DropdownMenuItem asChild>
                  <Link href={`/settings/listings/${listing.id}/delete`}>
                    Delete
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/settings/listings/${listing.id}/toggle-visibility`}
                  >
                    {listing.isPrivate ? "Make Public" : "Make Private"}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Tags */}
        {listing.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {listing.tags.slice(0, 3).map((tag: any) => (
              <Badge key={tag.id} variant="outline" className="text-xs">
                {tag.name}
              </Badge>
            ))}
            {listing.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{listing.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
