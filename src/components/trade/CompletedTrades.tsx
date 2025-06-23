"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Spinner from "@/components/global/loader/spinner";
import {
  CheckCircle,
  Package,
  Star,
  Calendar,
  MessageCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import SimpleCreateReview from "@/components/reviews/SimpleCreateReview";

type CompletedTrade = {
  id: string;
  status: "ACCEPTED";
  message?: string;
  createdAt: string;
  updatedAt: string;
  hasUserReviewed: boolean;
  userRole: "initiator" | "recipient";
  otherParty: {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    image?: string;
  };
  fromUser: {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    image?: string;
  };
  toUser: {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    image?: string;
  };
  targetListings: Array<{
    id: string;
    title: string;
    imageUrls: string[];
    tags?: Array<{ id: string; name: string }>;
  }>;
  initiatorListings: Array<{
    id: string;
    title: string;
    imageUrls: string[];
    tags?: Array<{ id: string; name: string }>;
  }>;
};

type CompletedTradesProps = {
  onReviewSubmitted?: () => void;
};

const CompletedTrades = ({ onReviewSubmitted }: CompletedTradesProps) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [completedTrades, setCompletedTrades] = useState<CompletedTrade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<CompletedTrade | null>(
    null
  );

  useEffect(() => {
    if (userId) {
      fetchCompletedTrades();
    }
  }, [userId]);

  const fetchCompletedTrades = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/trade/completed");
      if (response.ok) {
        const data = await response.json();
        setCompletedTrades(data.completedTrades || []);
      }
    } catch (error) {
      console.error("Failed to fetch completed trades:", error);
      toast({
        title: "Error",
        description: "Failed to load completed trades",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveReview = (trade: CompletedTrade) => {
    setSelectedTrade(trade);
    setReviewModalOpen(true);
  };
  const handleReviewSubmitted = async () => {
    setReviewModalOpen(false);
    setSelectedTrade(null);

    // Refresh the trades list to update review status
    await fetchCompletedTrades();

    // Notify parent component
    onReviewSubmitted?.();

    toast({
      title: "Review submitted!",
      description: "Thank you for leaving a review.",
    });
  };

  const handleCancelTrade = async (tradeId: string) => {
    try {
      const response = await fetch(`/api/trade/requests/${tradeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "CANCELED" }),
      });

      if (response.ok) {
        toast({
          title: "Trade canceled",
          description:
            "The trade has been canceled and all items have been relisted.",
        });
        // Refresh the list to remove the canceled trade
        await fetchCompletedTrades();
      } else {
        throw new Error("Failed to cancel trade request");
      }
    } catch (error) {
      console.error("Error canceling trade:", error);
      toast({
        title: "Error",
        description: "Failed to cancel trade request",
        variant: "destructive",
      });
    }
  };

  const CompletedTradeCard = ({ trade }: { trade: CompletedTrade }) => (
    <Card className="mb-4 border-green-200 bg-green-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-200">
              {trade.otherParty.image && (
                <Image
                  src={trade.otherParty.image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                @{trade.otherParty.username}
              </p>
              <p className="text-sm text-gray-600">
                Trade completed successfully
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              COMPLETED
            </Badge>
            <p className="text-xs text-gray-500 mt-1">
              {formatDate(trade.updatedAt)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Items Received */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Package className="h-4 w-4" />
              You Received
            </h4>
            <div className="space-y-2">
              {(trade.userRole === "initiator"
                ? trade.targetListings
                : trade.initiatorListings
              ).map((listing) => (
                <Link key={listing.id} href={`/listing/${listing.id}`}>
                  <div className="flex gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={listing.imageUrls[0] || "/placeholder-image.jpg"}
                        alt={listing.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {listing.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Items Given */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Package className="h-4 w-4" />
              You Gave
            </h4>
            <div className="space-y-2">
              {(trade.userRole === "initiator"
                ? trade.initiatorListings
                : trade.targetListings
              ).map((listing) => (
                <Link key={listing.id} href={`/listing/${listing.id}`}>
                  <div className="flex gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={listing.imageUrls[0] || "/placeholder-image.jpg"}
                        alt={listing.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {listing.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Original Message */}
        {trade.message && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Original message:</span>{" "}
              {trade.message}
            </p>
          </div>
        )}{" "}
        {/* Review and Cancel Actions */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            {trade.hasUserReviewed ? (
              <div className="flex items-center gap-2 text-green-600">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">
                  You've reviewed this trade
                </span>
              </div>
            ) : (
              <Button
                onClick={() => handleLeaveReview(trade)}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Star className="h-4 w-4 mr-1" />
                Leave Review
              </Button>
            )}
            <Button
              onClick={() => handleCancelTrade(trade.id)}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel Trade
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Spinner size={32} color="#000000" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Completed Trades ({completedTrades.length})
        </h2>
        <p className="text-sm text-gray-600">
          Successfully completed trades where you can leave reviews
        </p>
      </div>
      {completedTrades.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No completed trades
          </h3>
          <p className="text-gray-600">
            Once you complete some trades, they'll appear here for review.
          </p>
        </div>
      ) : (
        <div>
          {completedTrades.map((trade) => (
            <CompletedTradeCard key={trade.id} trade={trade} />
          ))}
        </div>
      )}{" "}
      {/* Review Modal */}
      {selectedTrade && (
        <SimpleCreateReview
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedTrade(null);
          }}
          revieweeId={selectedTrade.otherParty.id}
          listingId={
            selectedTrade.userRole === "initiator"
              ? selectedTrade.targetListings[0]?.id
              : selectedTrade.initiatorListings[0]?.id
          }
          tradeId={selectedTrade.id}
          onReviewSubmitted={handleReviewSubmitted}
          revieweeUsername={selectedTrade.otherParty.username}
        />
      )}
    </div>
  );
};

export default CompletedTrades;
