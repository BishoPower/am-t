"use client";

import { useState, useEffect } from "react";
import { Star, StarIcon, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
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

interface ReviewsListProps {
  revieweeId?: string;
  listingId?: string;
  userId?: string;
  showTitle?: boolean;
  maxReviews?: number;
}

export default function ReviewsList({
  revieweeId,
  listingId,
  userId,
  showTitle = true,
  maxReviews,
}: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [revieweeId, listingId, userId]);
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (revieweeId) {
        params.append("revieweeId", revieweeId);
      }
      if (listingId) {
        params.append("listingId", listingId);
      }
      if (userId) {
        params.append("userId", userId);
      }

      const response = await fetch(`/api/reviews?${params}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status}`);
      }

      const data = await response.json();
      console.log("ReviewsList: Received data", data);
      setReviews(data);
    } catch (err) {
      console.error("ReviewsList: Error fetching reviews", err);
      setError(err instanceof Error ? err.message : "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const displayedReviews =
    maxReviews && !showAll ? reviews.slice(0, maxReviews) : reviews;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (loading) {
    return (
      <div className="space-y-4">
        {showTitle && <h3 className="text-lg font-semibold">Reviews</h3>}
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button variant="outline" onClick={fetchReviews} className="mt-2">
          Try Again
        </Button>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        {showTitle && <h3 className="text-lg font-semibold mb-4">Reviews</h3>}
        <div className="text-gray-500">
          <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No reviews yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showTitle && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Reviews</h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-gray-600">
                ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
              </span>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {displayedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {" "}
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.reviewer.image} />
                  <AvatarFallback>
                    {review.reviewer.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">
                        @{review.reviewer.username}
                      </p>
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(review.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  {review.comment && (
                    <p className="text-gray-700 text-sm mb-2">
                      {review.comment}
                    </p>
                  )}

                  {review.listing && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-8 w-8 rounded overflow-hidden">
                        <img
                          src={review.listing.imageUrls[0]}
                          alt={review.listing.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {review.listing.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {maxReviews && reviews.length > maxReviews && !showAll && (
        <Button
          variant="outline"
          onClick={() => setShowAll(true)}
          className="w-full"
        >
          Show All {reviews.length} Reviews
        </Button>
      )}
    </div>
  );
}
