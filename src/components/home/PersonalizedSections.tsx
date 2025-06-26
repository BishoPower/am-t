"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Eye, Search } from "lucide-react";
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

type PersonalizedSection = {
  title: string;
  subtitle: string;
  listings: Listing[];
  type: "recommended" | "viewed" | "searches";
};

type PersonalizedSectionsProps = {
  sections: PersonalizedSection[];
};

const getSectionIcon = (type: string) => {
  switch (type) {
    case "recommended":
      return <TrendingUp className="h-5 w-5" />;
    case "viewed":
      return <Eye className="h-5 w-5" />;
    case "searches":
      return <Search className="h-5 w-5" />;
    default:
      return <TrendingUp className="h-5 w-5" />;
  }
};

const getSectionColor = (type: string) => {
  switch (type) {
    case "recommended":
      return "border-blue-500 bg-blue-50";
    case "viewed":
      return "border-green-500 bg-green-50";
    case "searches":
      return "border-purple-500 bg-purple-50";
    default:
      return "border-gray-500 bg-gray-50";
  }
};

export default function PersonalizedSections({
  sections,
}: PersonalizedSectionsProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-16">
      {sections.map((section, index) => (
        <section key={section.type} className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg border ${getSectionColor(
                  section.type
                )}`}
              >
                {getSectionIcon(section.type)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <p className="text-gray-600">{section.subtitle}</p>
              </div>
            </div>

            {section.listings.length > 8 && (
              <Link href="/marketplace">
                <Button
                  variant="outline"
                  className="border-2 hover:bg-black hover:text-white transition-colors"
                >
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>

          {/* Listings Grid */}
          {section.listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {" "}
              {section.listings.slice(0, 8).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="mb-4 opacity-50">
                {getSectionIcon(section.type)}
              </div>
              <p className="text-gray-500 mb-4">
                No items found for this section yet.
              </p>
              <Link href="/marketplace">
                <Button variant="outline">Explore Marketplace</Button>
              </Link>
            </div>
          )}

          {/* Show More Button for sections with many items */}
          {section.listings.length > 8 && (
            <div className="text-center">
              <Link href="/marketplace">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 hover:bg-black hover:text-white transition-colors"
                >
                  Show {section.listings.length - 8} More Items
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
