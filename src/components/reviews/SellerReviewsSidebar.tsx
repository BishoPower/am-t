"use client";

import { useState, useEffect } from "react";
import { Star, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { formatDistanceToNow } from "date-fns";

interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer: {
    id: string;
    username: string;
    image?: string;
  };
  reviewee: {
    id: string;
    username: string;
    image?: string;
  };
  listing?: {
    id: string;
    title: string;
    imageUrls: string[];
  };
}

interface SellerReviewsSidebarProps {
  sellerId: string;
  sellerName: string;
}

export default function SellerReviewsSidebar({
  sellerId,
  sellerName,
}: SellerReviewsSidebarProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  useEffect(() => {
    fetchReviews();
  }, [sellerId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews?revieweeId=${sellerId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status}`);
      }

      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error("SellerReviewsSidebar: Error fetching reviews", err);
      setError(err instanceof Error ? err.message : "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
    };

    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const getCurrentPageReviews = () => {
    const start = currentPage * reviewsPerPage;
    const end = start + reviewsPerPage;
    return reviews.slice(start, end);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
          <div className="h-16 bg-gray-200 rounded mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-16" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-2">Seller Reviews</h3>
        <div className="text-center">
          <p className="text-red-500 text-sm mb-2">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchReviews}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Seller Reviews</h3>
        <div className="text-center py-6">
          <User className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">No reviews yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      {" "}
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold mb-3">Seller Reviews</h3>

        {/* Rating Summary */}
        <div className="text-center bg-gray-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {averageRating.toFixed(1)}
          </div>
          {renderStars(Math.round(averageRating), "md")}
          <p className="text-xs text-gray-500 mt-1">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>{" "}
      {/* Reviews */}
      <div className="p-4">
        {" "}
        <div className="space-y-3">
          {getCurrentPageReviews().map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={review.reviewer.image} />
                  <AvatarFallback className="text-xs">
                    {review.reviewer.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-xs truncate">
                      @{review.reviewer.username}
                    </p>
                  </div>
                  
                  {/* Centered stars */}
                  <div className="flex justify-center mb-1">
                    {renderStars(review.rating)}
                  </div>

                  {review.comment && (
                    <p
                      className="text-xs text-gray-700 mb-1 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {review.comment}
                    </p>
                  )}

                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(review.createdAt), {
                      addSuffix: true,
                    })}
                  </p>

                  {review.listing && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="h-4 w-4 rounded overflow-hidden">
                        <img
                          src={review.listing.imageUrls[0]}
                          alt={review.listing.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-600 truncate">
                        {review.listing.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="px-2"
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <span className="text-xs text-gray-500">
              {currentPage + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className="px-2"
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        )}
        {/* View All Reviews Button */}
        {reviews.length > reviewsPerPage && (
          <div className="mt-3 pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                // TODO: Navigate to full reviews page or modal
                console.log("Navigate to full reviews page");
              }}
            >
              View All {reviews.length} Reviews
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
