"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ListingCard from "./ListingCard";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type SimilarListingsProps = {
  listingId: string;
  currentListingTitle?: string;
};

const SimilarListings = ({
  listingId,
  currentListingTitle,
}: SimilarListingsProps) => {
  const router = useRouter();
  const [similarListings, setSimilarListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTagClick = (tagName: string) => {
    // Navigate to search results filtered by the clicked tag
    router.push(`/search?tags=${encodeURIComponent(tagName)}`);
  };

  useEffect(() => {
    const fetchSimilarListings = async () => {
      try {
        const response = await fetch(
          `/api/listings/${listingId}/similar?limit=12`
        );
        if (response.ok) {
          const listings = await response.json();
          setSimilarListings(listings);
        }
      } catch (error) {
        console.error("Failed to fetch similar listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarListings();
  }, [listingId]);

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Similar Items</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (similarListings.length === 0) {
    return null; // Don't show the section if no similar listings found
  }

  const itemsPerPage = 4;
  const totalPages = Math.ceil(similarListings.length / itemsPerPage);
  const currentListings = similarListings.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <div className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Similar Items
              </h2>
              <p className="text-gray-600 mt-1">
                You might also like these items
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevious}
                className="px-3 py-2 h-9"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <span className="text-sm text-gray-500 px-3 py-2 bg-gray-50 rounded-md min-w-[80px] text-center">
                {currentIndex + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNext}
                className="px-3 py-2 h-9"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentListings.map((listing) => (
            <div key={listing.id} className="group">
              {" "}
              <ListingCard
                listing={listing}
                showPrivateIndicator={false}
                showEditOptions={false}
                onTagClick={handleTagClick}
              />
              {/* Additional info overlay on hover */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>by @{listing.user.username}</span>
                  <span>{listing.favorites?.length || 0} ♥</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-black"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
        {/* View More Link */}
        <div className="text-center mt-8">
          <Link
            href={`/search?similar=${listingId}`}
            className="text-black hover:text-gray-600 font-medium inline-flex items-center gap-1"
          >
            View all similar items
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimilarListings;
