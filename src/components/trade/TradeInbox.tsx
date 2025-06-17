"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Spinner from "@/components/global/loader/spinner";
import {
  Check,
  X,
  Clock,
  Package,
  User,
  Calendar,
  ArrowLeftRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import CounterTradeModal from "./CounterTradeModal";

type TradeRequest = {
  id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  message?: string;
  createdAt: string;
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
  }>;
  initiatorListings: Array<{
    id: string;
    title: string;
    imageUrls: string[];
  }>;
};

type TradeInboxProps = {
  onTradeUpdate?: () => void; // Callback to notify parent of trade changes
};

const TradeInbox = ({ onTradeUpdate }: TradeInboxProps) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [receivedRequests, setReceivedRequests] = useState<TradeRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<TradeRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCounterModalOpen, setIsCounterModalOpen] = useState(false);
  const [selectedRequestForCounter, setSelectedRequestForCounter] =
    useState<TradeRequest | null>(null);

  useEffect(() => {
    if (userId) {
      fetchTradeRequests();
    }
  }, [userId]);

  const fetchTradeRequests = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/trade/requests");
      if (response.ok) {
        const data = await response.json();
        setReceivedRequests(data.received || []);
        setSentRequests(data.sent || []);
      }
    } catch (error) {
      console.error("Failed to fetch trade requests:", error);
      toast({
        title: "Error",
        description: "Failed to load trade requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleTradeResponse = async (
    requestId: string,
    action: "accept" | "reject"
  ) => {
    try {
      // Optimistically remove the request from the UI
      setReceivedRequests((prev) => prev.filter((req) => req.id !== requestId));

      // Map action to the correct API format
      const apiAction = action === "accept" ? "ACCEPTED" : "REJECTED";

      const response = await fetch(`/api/trade/requests/${requestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: apiAction }),
      });
      if (response.ok) {
        toast({
          title: action === "accept" ? "Trade accepted!" : "Trade rejected",
          description:
            action === "accept"
              ? "The trade has been accepted. Items will be exchanged."
              : "The trade request has been rejected.",
        });
        // Refresh the list after a short delay to ensure consistency
        setTimeout(() => {
          fetchTradeRequests();
          // Notify parent component of trade update
          onTradeUpdate?.();
        }, 500);
      } else {
        // Revert the optimistic update if the request failed
        fetchTradeRequests();
        throw new Error("Failed to respond to trade request");
      }
    } catch (error) {
      console.error("Error responding to trade:", error);
      toast({
        title: "Error",
        description: "Failed to respond to trade request",
        variant: "destructive",
      });
    }
  };

  const handleCounterTrade = (request: TradeRequest) => {
    setSelectedRequestForCounter(request);
    setIsCounterModalOpen(true);
  };
  const handleCounterTradeSubmit = async (
    offerListings: any[],
    targetListings: any[],
    message: string
  ) => {
    if (!selectedRequestForCounter) return;

    try {
      // Optimistically remove the request from the UI
      setReceivedRequests((prev) =>
        prev.filter((req) => req.id !== selectedRequestForCounter.id)
      );

      // First, send the counter offer
      const counterResponse = await fetch("/api/trade/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetListingIds: targetListings.map((l) => l.id),
          offerListingIds: offerListings.map((l) => l.id),
          message: message || undefined,
          isCounterOffer: true,
          originalRequestId: selectedRequestForCounter.id,
        }),
      });

      if (!counterResponse.ok) {
        // Revert the optimistic update if the request failed
        setReceivedRequests((prev) => [...prev, selectedRequestForCounter]);
        throw new Error("Failed to send counter offer");
      }

      // Then, automatically reject the original request
      const rejectResponse = await fetch(
        `/api/trade/requests/${selectedRequestForCounter.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "REJECTED" }),
        }
      );

      if (!rejectResponse.ok) {
        console.warn(
          "Failed to reject original request, but counter offer was sent"
        );
      }

      toast({
        title: "Counter offer sent!",
        description: `Your counter offer has been sent to @${selectedRequestForCounter.fromUser.username}. The original request has been declined.`,
      });
      setIsCounterModalOpen(false);
      setSelectedRequestForCounter(null);

      // Refresh the list to ensure consistency
      setTimeout(() => {
        fetchTradeRequests();
      }, 500);
    } catch (error) {
      console.error("Error sending counter offer:", error);
      toast({
        title: "Error",
        description: "Failed to send counter offer",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const TradeRequestCard = ({
    request,
    isReceived,
  }: {
    request: TradeRequest;
    isReceived: boolean;
  }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-200">
              {(isReceived ? request.fromUser.image : request.toUser.image) && (
                <Image
                  src={
                    isReceived ? request.fromUser.image! : request.toUser.image!
                  }
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {isReceived
                  ? `@${request.fromUser.username}`
                  : `@${request.toUser.username}`}
              </p>
              <p className="text-sm text-gray-600">
                {isReceived
                  ? "wants to trade with you"
                  : "you want to trade with"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge className={getStatusColor(request.status)}>
              {request.status}
            </Badge>
            <p className="text-xs text-gray-500 mt-1">
              {formatDate(request.createdAt)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {" "}
          {/* Target Items */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Package className="h-4 w-4" />
              {isReceived ? "Your Items" : "Items You Want"}
            </h4>
            <div className="space-y-2">
              {request.targetListings.map((listing) => (
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
          </div>{" "}
          {/* Offer Items */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Package className="h-4 w-4" />
              {isReceived ? "Offered Items" : "Your Offer"}
            </h4>
            <div className="space-y-2">
              {request.initiatorListings.map((listing) => (
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
        {/* Message */}
        {request.message && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Message:</span> {request.message}
            </p>
          </div>
        )}{" "}
        {/* Actions for received pending requests */}
        {isReceived && request.status === "PENDING" && (
          <div className="mt-4 flex gap-2 flex-wrap">
            <Button
              onClick={() => handleTradeResponse(request.id, "accept")}
              size="sm"
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button
              onClick={() => handleCounterTrade(request)}
              variant="outline"
              size="sm"
              className="text-gray-700 border-gray-500 hover:bg-gray-50"
            >
              <ArrowLeftRight className="h-4 w-4 mr-1" />
              Counter Offer
            </Button>
            <Button
              onClick={() => handleTradeResponse(request.id, "reject")}
              variant="outline"
              size="sm"
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        )}
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
      <Tabs defaultValue="received" className="w-full">
        {" "}
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Received (
            {receivedRequests.filter((req) => req.status === "PENDING").length})
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Sent (
            {sentRequests.filter((req) => req.status === "PENDING").length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="received" className="mt-6">
          {receivedRequests.filter((req) => req.status === "PENDING").length ===
          0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No trade requests
              </h3>
              <p className="text-gray-600">
                You haven't received any trade requests yet.
              </p>
            </div>
          ) : (
            <div>
              {receivedRequests
                .filter((req) => req.status === "PENDING")
                .map((request) => (
                  <TradeRequestCard
                    key={request.id}
                    request={request}
                    isReceived={true}
                  />
                ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="sent" className="mt-6">
          {sentRequests.filter((req) => req.status === "PENDING").length ===
          0 ? (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No trade requests sent
              </h3>
              <p className="text-gray-600">
                You haven't sent any trade requests yet.
              </p>
            </div>
          ) : (
            <div>
              {sentRequests
                .filter((req) => req.status === "PENDING")
                .map((request) => (
                  <TradeRequestCard
                    key={request.id}
                    request={request}
                    isReceived={false}
                  />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Counter Trade Modal */}
      <CounterTradeModal
        isOpen={isCounterModalOpen}
        onClose={() => {
          setIsCounterModalOpen(false);
          setSelectedRequestForCounter(null);
        }}
        originalRequest={selectedRequestForCounter}
        onCounterTradeSubmit={handleCounterTradeSubmit}
      />
    </div>
  );
};

export default TradeInbox;
