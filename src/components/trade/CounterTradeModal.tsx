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
import { X, RefreshCw, Check, AlertCircle, ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import Spinner from "@/components/global/loader/spinner";

type CounterTradeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  originalRequest: any;
  onCounterTradeSubmit: (
    offerListings: any[],
    targetListings: any[],
    message: string
  ) => void;
};

const CounterTradeModal = ({
  isOpen,
  onClose,
  originalRequest,
  onCounterTradeSubmit,
}: CounterTradeModalProps) => {
  const { userId } = useAuth();
  const [userListings, setUserListings] = useState<any[]>([]);
  const [otherUserListings, setOtherUserListings] = useState<any[]>([]);
  const [selectedOfferListings, setSelectedOfferListings] = useState<any[]>([]);
  const [selectedTargetListings, setSelectedTargetListings] = useState<any[]>(
    []
  );
  const [counterMessage, setCounterMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  useEffect(() => {
    if (isOpen && userId && originalRequest) {
      fetchUserListings();
      fetchOtherUserListings();
      // Pre-fill "Your Offer" with the items that the original requester wanted (target listings)
      if (originalRequest.targetListings) {
        setSelectedOfferListings([...originalRequest.targetListings]);
      }
    }
  }, [isOpen, userId, originalRequest]);
  const fetchUserListings = async () => {
    try {
      const response = await fetch(`/api/user/listings`);
      if (response.ok) {
        const data = await response.json();
        // Filter out private listings and items that are already pre-selected (target items)
        const preSelectedIds =
          originalRequest?.targetListings?.map((item: any) => item.id) || [];
        const availableListings = data.filter(
          (listing: any) =>
            !listing.isPrivate &&
            listing.status === "ACTIVE" &&
            !preSelectedIds.includes(listing.id)
        );
        setUserListings(availableListings);
      }
    } catch (error) {
      console.error("Failed to fetch user listings:", error);
    }
  };

  const fetchOtherUserListings = async () => {
    try {
      const response = await fetch(
        `/api/user/${originalRequest.fromUser.id}/listings`
      );
      if (response.ok) {
        const data = await response.json();
        // Filter out private listings only (allow all active listings for counter trades)
        const availableListings = data.filter(
          (listing: any) => !listing.isPrivate && listing.status === "ACTIVE"
        );
        setOtherUserListings(availableListings);
      }
    } catch (error) {
      console.error("Failed to fetch other user listings:", error);
    }
  };

  const handleDragStart = (
    e: React.DragEvent,
    listing: any,
    isFromOtherUser: boolean
  ) => {
    setDraggedItem({ ...listing, isFromOtherUser });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const handleDropOffer = (e: React.DragEvent) => {
    e.preventDefault();
    if (
      draggedItem &&
      !draggedItem.isFromOtherUser &&
      !selectedOfferListings.find((item) => item.id === draggedItem.id)
    ) {
      setSelectedOfferListings((prev) => [...prev, draggedItem]);
    }
    setDraggedItem(null);
  };

  const handleDropTarget = (e: React.DragEvent) => {
    e.preventDefault();
    if (
      draggedItem &&
      draggedItem.isFromOtherUser &&
      !selectedTargetListings.find((item) => item.id === draggedItem.id)
    ) {
      setSelectedTargetListings((prev) => [...prev, draggedItem]);
    }
    setDraggedItem(null);
  };

  const removeFromOffer = (listingId: string) => {
    setSelectedOfferListings((prev) =>
      prev.filter((item) => item.id !== listingId)
    );
  };

  const removeFromTarget = (listingId: string) => {
    setSelectedTargetListings((prev) =>
      prev.filter((item) => item.id !== listingId)
    );
  };

  const handleSubmitCounterTrade = async () => {
    if (
      selectedOfferListings.length === 0 ||
      selectedTargetListings.length === 0
    )
      return;

    setIsLoading(true);
    try {
      await onCounterTradeSubmit(
        selectedOfferListings,
        selectedTargetListings,
        counterMessage
      );
      // Reset form state
      setSelectedOfferListings([]);
      setSelectedTargetListings([]);
      setCounterMessage("");
    } catch (error) {
      console.error("Failed to submit counter trade:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden p-0">
        <div className="bg-white min-h-[700px]">
          {/* Header */}{" "}
          <DialogHeader className="p-6 pb-4 border-b border-gray-200">
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ArrowLeftRight className="h-6 w-6 text-gray-800" />
              Counter Trade Offer
            </DialogTitle>
            <p className="text-gray-600 mt-2">
              The items they requested are pre-filled. Modify your offer and
              select what you want in return.
            </p>
          </DialogHeader>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Left Side - Your Closet */}
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

              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto bg-gray-50 p-4 rounded-lg border border-gray-200">
                {userListings.map((listing) => (
                  <div
                    key={listing.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, listing, false)}
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
                  </div>
                ))}
              </div>
            </div>

            {/* Middle - Trade Interface */}
            <div className="space-y-4">
              {/* Your Counter Offer */}
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
                    {selectedOfferListings.length} items
                  </Badge>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDropOffer}
                  className="min-h-24 bg-white rounded-lg border-2 border-dashed border-gray-300 p-3 transition-colors hover:border-gray-500"
                >
                  {selectedOfferListings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-gray-500 py-4">
                      <RefreshCw className="h-6 w-6 mb-1 opacity-50" />
                      <p className="text-xs">Drag your items here</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedOfferListings.map((listing) => (
                        <div
                          key={listing.id}
                          className="relative bg-gray-50 rounded-lg p-1 border border-gray-300"
                        >
                          <button
                            onClick={() => removeFromOffer(listing.id)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors z-10"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <div className="aspect-square relative mb-1 rounded overflow-hidden">
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
              </div>

              {/* What You Want */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-700 rounded"></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      You Want
                    </h3>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-600"
                  >
                    {selectedTargetListings.length} items
                  </Badge>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDropTarget}
                  className="min-h-24 bg-white rounded-lg border-2 border-dashed border-gray-300 p-3 transition-colors hover:border-gray-500"
                >
                  {selectedTargetListings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-gray-500 py-4">
                      <RefreshCw className="h-6 w-6 mb-1 opacity-50" />
                      <p className="text-xs">Drag their items here</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedTargetListings.map((listing) => (
                        <div
                          key={listing.id}
                          className="relative bg-gray-50 rounded-lg p-1 border border-gray-300"
                        >
                          <button
                            onClick={() => removeFromTarget(listing.id)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors z-10"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <div className="aspect-square relative mb-1 rounded overflow-hidden">
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
              </div>

              {/* Counter Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Counter Offer Message (Optional)
                </label>
                <Textarea
                  value={counterMessage}
                  onChange={(e) => setCounterMessage(e.target.value)}
                  placeholder="Explain your counter offer or what you're looking for..."
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-gray-600"
                  rows={3}
                />
              </div>
            </div>

            {/* Right Side - Their Closet */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  @{originalRequest?.fromUser?.username}'s Closet
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-600"
                >
                  {otherUserListings.length} items
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto bg-gray-50 p-4 rounded-lg border border-gray-200">
                {otherUserListings.map((listing) => (
                  <div
                    key={listing.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, listing, true)}
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
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="p-6 pt-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Counter offers expire in 7 days</span>
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
                  onClick={handleSubmitCounterTrade}
                  disabled={
                    selectedOfferListings.length === 0 ||
                    selectedTargetListings.length === 0 ||
                    isLoading
                  }
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
                      Send Counter Offer
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

export default CounterTradeModal;
