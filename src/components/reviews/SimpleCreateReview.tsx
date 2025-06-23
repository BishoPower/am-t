"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useToast } from "../../hooks/use-toast";

interface SimpleCreateReviewProps {
  isOpen?: boolean;
  onClose?: () => void;
  revieweeId: string;
  revieweeName?: string;
  revieweeUsername?: string;
  listingId?: string;
  listingTitle?: string;
  tradeId?: string;
  onReviewCreated?: () => void;
  onReviewSubmitted?: () => void;
  onCancel?: () => void;
}

/**
 * Simple review creation component - standalone implementation
 * Created to resolve import/export issues with the original CreateReview component
 */
const SimpleCreateReview: React.FC<SimpleCreateReviewProps> = ({
  isOpen,
  onClose,
  revieweeId,
  revieweeName,
  revieweeUsername,
  listingId,
  listingTitle,
  tradeId,
  onReviewCreated,
  onReviewSubmitted,
  onCancel,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const displayName = revieweeName || revieweeUsername || "this user";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment: comment.trim() || null,
          revieweeId,
          listingId,
          tradeId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create review");
      }

      toast({
        title: "Review Submitted",
        description: "Your review has been posted successfully.",
      });

      setRating(0);
      setComment("");

      if (onReviewCreated) {
        onReviewCreated();
      }

      if (onReviewSubmitted) {
        onReviewSubmitted();
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit review";

      toast({
        title: "Unable to Submit Review",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                star <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const getRatingText = (rating: number) => {
    const texts = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    };
    return texts[rating as keyof typeof texts] || "";
  };

  // If it's a modal
  if (isOpen !== undefined) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Review for {displayName}</DialogTitle>
            <p className="text-sm text-gray-600 mt-2">
              You can leave a review for users you've completed trades with.
            </p>
          </DialogHeader>
          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Rating *</Label>
                <div className="flex items-center gap-3 mt-2">
                  {renderStars()}
                  {(hoveredRating || rating) > 0 && (
                    <span className="text-sm text-gray-600">
                      {getRatingText(hoveredRating || rating)}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="comment" className="text-sm font-medium">
                  Comment (Optional)
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Share your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-2"
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {comment.length}/500 characters
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={submitting || rating === 0}
                  className="flex-1"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Regular card format
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Write a Review for {displayName}
        </CardTitle>
        <p className="text-sm text-gray-600">
          You can leave a review for users you've completed trades with.
        </p>
        {listingTitle && (
          <p className="text-sm text-gray-600">Regarding: {listingTitle}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Rating *</Label>
            <div className="flex items-center gap-3 mt-2">
              {renderStars()}
              {(hoveredRating || rating) > 0 && (
                <span className="text-sm text-gray-600">
                  {getRatingText(hoveredRating || rating)}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="comment" className="text-sm font-medium">
              Comment (Optional)
            </Label>
            <Textarea
              id="comment"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-2"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length}/500 characters
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={submitting || rating === 0}
              className="flex-1"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
            {(onCancel || onClose) && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel || onClose}
                disabled={submitting}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

SimpleCreateReview.displayName = "SimpleCreateReview";

export default SimpleCreateReview;
