"use client";

import React, { useState, useEffect } from "react";
import ListingCard from "@/components/listing/ListingCard";
import Spinner from "@/components/global/loader/spinner";

interface Listing {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  isPrivate: boolean;
  status: string;
  createdAt: string;
  tags: { id: string; name: string }[];
  user: {
    id: string;
    username: string;
    image?: string;
  };
  _count: {
    favorites: number;
  };
}

export default function BasicMarketplace() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listings?page=1&limit=12");
        if (response.ok) {
          const data = await response.json();
          setListings(data.listings);
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={64} color="#000000" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
        <p className="text-gray-600">
          Discover amazing items from the AM-T community
        </p>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          {listings.length} {listings.length === 1 ? "item" : "items"} found
        </p>
      </div>

      {/* Listings Grid */}
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              showPrivateIndicator={false}
              showEditOptions={false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No listings found
          </h3>
          <p className="text-gray-500">
            Be the first to share something amazing!
          </p>
        </div>
      )}
    </div>
  );
}
