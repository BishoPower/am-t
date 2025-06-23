"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ListingCard from "@/components/listing/ListingCard";
import MarketplaceFilters from "./MarketplaceFilters";
import MarketplacePagination from "./MarketplacePagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, RefreshCw } from "lucide-react";
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

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function MarketplaceContent() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchKey, setLastFetchKey] = useState("");

  // Get URL parameters
  const urlSearch = searchParams.get("search") || "";
  const urlTags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const urlSortBy = searchParams.get("sortBy") || "newest";
  const urlPage = parseInt(searchParams.get("page") || "1");

  const currentFilters = {
    search: urlSearch,
    tags: urlTags,
    sortBy: urlSortBy,
  };

  const fetchListings = async (
    search: string,
    tags: string[],
    sortBy: string,
    page: number
  ) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        search,
        tags: tags.join(","),
        sortBy,
      });

      const response = await fetch(`/api/listings?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setListings(data.listings);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a unique key for the current parameters to prevent duplicate fetches
  const fetchKey = `${urlSearch}-${urlTags.join(",")}-${urlSortBy}-${urlPage}`;

  useEffect(() => {
    if (fetchKey !== lastFetchKey) {
      setLastFetchKey(fetchKey);
      fetchListings(urlSearch, urlTags, urlSortBy, urlPage);
    }
  }, [fetchKey, lastFetchKey, urlSearch, urlTags, urlSortBy, urlPage]);

  const handleTagClick = (tagName: string) => {
    // Navigate to search with the clicked tag
    const newParams = new URLSearchParams(searchParams.toString());
    const currentTags = newParams.get("tags")?.split(",").filter(Boolean) || [];

    if (!currentTags.includes(tagName)) {
      currentTags.push(tagName);
      newParams.set("tags", currentTags.join(","));
      newParams.delete("page"); // Reset to page 1
      window.history.pushState(null, "", `?${newParams.toString()}`);
    }
  };

  const removeFilter = (type: string, value?: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (type === "search") {
      newParams.delete("search");
    } else if (type === "tag" && value) {
      const currentTags =
        newParams.get("tags")?.split(",").filter(Boolean) || [];
      const filteredTags = currentTags.filter((tag) => tag !== value);
      if (filteredTags.length > 0) {
        newParams.set("tags", filteredTags.join(","));
      } else {
        newParams.delete("tags");
      }
    }

    newParams.delete("page"); // Reset to page 1
    window.history.pushState(null, "", `?${newParams.toString()}`);
  };

  const clearAllFilters = () => {
    window.history.pushState(null, "", "/marketplace");
  };

  const refreshListings = () => {
    fetchListings(urlSearch, urlTags, urlSortBy, urlPage);
  };

  const hasActiveFilters =
    currentFilters.search || currentFilters.tags.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
        <p className="text-gray-600">
          Discover amazing items from the AM-T community
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <MarketplaceFilters />

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Active filters:
            </span>

            {currentFilters.search && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: "{currentFilters.search}"
                <button
                  onClick={() => removeFilter("search")}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {currentFilters.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1"
              >
                #{tag}
                <button
                  onClick={() => removeFilter("tag", tag)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Results count and refresh */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          {isLoading
            ? "Loading..."
            : `${pagination.total} ${
                pagination.total === 1 ? "item" : "items"
              } found`}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshListings}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner size={48} color="#000000" />
        </div>
      ) : listings.length > 0 ? (
        <>
          {/* Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {listings.map((listing) => (
              <div key={listing.id} className="group">
                <ListingCard
                  listing={listing}
                  showPrivateIndicator={false}
                  showEditOptions={false}
                  onTagClick={handleTagClick}
                />
                {/* Additional info overlay on hover */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>by @{listing.user?.username}</span>
                    <span>{listing._count?.favorites || 0} ♥</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <MarketplacePagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              searchParams={searchParams}
            />
          )}
        </>
      ) : (
        /* Empty state */
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="h-16 w-16 text-gray-400 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
          <p className="text-gray-500 mb-4">
            {hasActiveFilters
              ? "Try adjusting your filters or search terms"
              : "Be the first to share something amazing!"}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearAllFilters}>
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
