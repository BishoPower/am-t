"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import ListingCard from "@/components/listing/ListingCard";

type Listing = {
  id: string;
  title: string;
  description?: string;
  imageUrls: string[];
  tags: { id: string; name: string }[];
  user: {
    id: string;
    username: string;
    image?: string;
    displayName?: string;
  };
  createdAt: string;
};

type TrendingRecentSectionsProps = {
  trendingListings: Listing[];
  recentListings: Listing[];
};

export default function TrendingRecentSections({
  trendingListings,
  recentListings,
}: TrendingRecentSectionsProps) {
  return (
    <div className="space-y-16">
      {/* Trending Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg border border-red-500 bg-red-50">
              <TrendingUp className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Trending Now</h2>
              <p className="text-gray-600">
                Most popular items in the community
              </p>
            </div>
          </div>

          <Link href="/marketplace">
            <Button
              variant="outline"
              className="border-2 hover:bg-black hover:text-white transition-colors"
            >
              View All
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {trendingListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {" "}
            {trendingListings.slice(0, 8).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <TrendingUp className="h-8 w-8 mx-auto mb-4 opacity-50" />
            <p className="text-gray-500 mb-4">No trending items found.</p>
            <Link href="/marketplace">
              <Button variant="outline">Explore Marketplace</Button>
            </Link>
          </div>
        )}
      </section>

      {/* Recent Listings Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg border border-green-500 bg-green-50">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Just Listed</h2>
              <p className="text-gray-600">Fresh items from the community</p>
            </div>
          </div>

          <Link href="/marketplace">
            <Button
              variant="outline"
              className="border-2 hover:bg-black hover:text-white transition-colors"
            >
              View All
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {recentListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {" "}
            {recentListings.slice(0, 12).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Clock className="h-8 w-8 mx-auto mb-4 opacity-50" />
            <p className="text-gray-500 mb-4">No recent listings found.</p>
            <Link href="/marketplace">
              <Button variant="outline">Explore Marketplace</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
