"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { X, DollarSign, RefreshCw, Check, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import Spinner from "@/components/global/loader/spinner";

type TradeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  targetListing: any;
  onTradeSubmit: (offerListings: any[], message: string) => void;
};

const TradeModal = ({
  isOpen,
  onClose,
  targetListing,
  onTradeSubmit,
}: TradeModalProps) => {
  const { userId } = useAuth();
  const [userListings, setUserListings] = useState<any[]>([]);
  const [selectedListings, setSelectedListings] = useState<any[]>([]);
  const [tradeMessage, setTradeMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [draggedItem, setDraggedItem] = useState<any>(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserListings();
    }
  }, [isOpen, userId]);

  const fetchUserListings = async () => {
    try {
      const response = await fetch(`/api/user/listings`);
      if (response.ok) {
        const data = await response.json();
        // Filter out the target listing and private listings
        const availableListings = data.filter(
          (listing: any) =>
            listing.id !== targetListing?.id &&
            !listing.isPrivate &&
            listing.status === "ACTIVE"
        );
        setUserListings(availableListings);
      }
    } catch (error) {
      console.error("Failed to fetch user listings:", error);
    }
  };

  const handleDragStart = (e: React.DragEvent, listing: any) => {
    setDraggedItem(listing);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (
      draggedItem &&
      !selectedListings.find((item) => item.id === draggedItem.id)
    ) {
      setSelectedListings((prev) => [...prev, draggedItem]);
    }
    setDraggedItem(null);
  };

  const removeFromOffer = (listingId: string) => {
    setSelectedListings((prev) => prev.filter((item) => item.id !== listingId));
  };
  const handleSubmitTrade = async () => {
    if (selectedListings.length === 0) return;

    setIsLoading(true);
    try {
      await onTradeSubmit(selectedListings, tradeMessage);
      // Reset form state
      setSelectedListings([]);
      setTradeMessage("");
    } catch (error) {
      console.error("Failed to submit trade:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <div className="bg-white min-h-[600px]">
          {/* Header */}{" "}
          <DialogHeader className="p-6 pb-4 border-b border-gray-200">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <RefreshCw className="h-6 w-6 text-gray-800" />
              Trade Request
            </DialogTitle>
          </DialogHeader>{" "}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {/* Left Side - Your Closet */}{" "}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-gray-800 rounded"></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Your Closet
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-600"
                >
                  {userListings.length} items
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto bg-gray-50 p-4 rounded-lg border border-gray-200">
                {userListings.map((listing) => (
                  <div
                    key={listing.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, listing)}
                    className="group relative bg-white rounded-lg p-2 cursor-grab active:cursor-grabbing hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:border-gray-400 hover:shadow-md"
                  >
                    <div className="aspect-square relative mb-2 rounded overflow-hidden">
                      <Image
                        src={listing.imageUrls?.[0] || "/placeholder-image.jpg"}
                        alt={listing.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <p className="text-xs text-gray-700 truncate font-medium">
                      {listing.title}
                    </p>
                    {listing.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {listing.tags.slice(0, 2).map((tag: any) => (
                          <Badge
                            key={tag.id}
                            variant="outline"
                            className="text-xs bg-gray-50 border-gray-300 text-gray-600"
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>{" "}
            {/* Right Side - Trade Interface */}
            <div className="space-y-4">
              {/* Target Item */}{" "}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 bg-gray-700 rounded"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Item You Want
                  </h3>
                </div>

                {targetListing && (
                  <div className="bg-white rounded-lg p-3 border border-gray-300">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            targetListing.imageUrls?.[0] ||
                            "/placeholder-image.jpg"
                          }
                          alt={targetListing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {targetListing.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          by @{targetListing.user?.username}
                        </p>
                        {targetListing.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {targetListing.tags.slice(0, 3).map((tag: any) => (
                              <Badge
                                key={tag.id}
                                variant="outline"
                                className="text-xs bg-gray-50 border-gray-300 text-gray-600"
                              >
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>{" "}
              {/* Your Offer */}{" "}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-800 rounded"></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Your Offer
                    </h3>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-600"
                  >
                    {selectedListings.length} items
                  </Badge>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="min-h-32 bg-white rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-gray-500"
                >
                  {selectedListings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-gray-500 py-8">
                      <RefreshCw className="h-8 w-8 mb-2 opacity-50" />
                      <p className="text-sm">
                        Drag items here to create your offer
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {selectedListings.map((listing) => (
                        <div
                          key={listing.id}
                          className="relative bg-gray-50 rounded-lg p-2 border border-gray-300"
                        >
                          <button
                            onClick={() => removeFromOffer(listing.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors z-10"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <div className="aspect-square relative mb-2 rounded overflow-hidden">
                            <Image
                              src={
                                listing.imageUrls?.[0] ||
                                "/placeholder-image.jpg"
                              }
                              alt={listing.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="text-xs text-gray-700 truncate font-medium">
                            {listing.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>{" "}
              {/* Trade Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <Textarea
                  value={tradeMessage}
                  onChange={(e) => setTradeMessage(e.target.value)}
                  placeholder="Add a message to your trade offer..."
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-gray-600"
                  rows={3}
                />
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="p-6 pt-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Trade offers expire in 7 days</span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitTrade}
                  disabled={selectedListings.length === 0 || isLoading}
                  className="bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-50 disabled:bg-gray-400"
                >
                  {" "}
                  {isLoading ? (
                    <>
                      <Spinner size={16} color="#ffffff" />
                      <span className="ml-2">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Send Trade Offer
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeModal;
