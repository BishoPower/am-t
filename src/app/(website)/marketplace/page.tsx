"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ListingCard from "@/components/listing/ListingCard";
import Spinner from "@/components/global/loader/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";

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

interface PopularTag {
  name: string;
  count: number;
}

export default function MarketplacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });
  const [popularTags, setPopularTags] = useState<PopularTag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTagsLoading, setIsTagsLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  // Memoize URL parameters to prevent infinite re-renders
  const urlParams = useMemo(() => {
    const search = searchParams.get("search") || "";
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const sortBy = searchParams.get("sortBy") || "newest";
    const page = parseInt(searchParams.get("page") || "1");

    return { search, tags, sortBy, page };
  }, [searchParams]);

  // Fetch listings
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
        search: search,
        tags: tags.join(","),
        sortBy: sortBy,
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

  // Fetch popular tags
  const fetchPopularTags = async () => {
    try {
      const response = await fetch("/api/search/tags?popular=true&limit=20");
      if (response.ok) {
        const data = await response.json();
        setPopularTags(data);
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    } finally {
      setIsTagsLoading(false);
    }
  };

  // Sync local state with URL params and fetch listings
  useEffect(() => {
    setSearchQuery(urlParams.search);
    setSelectedTags(urlParams.tags);
    setSortBy(urlParams.sortBy);
    fetchListings(
      urlParams.search,
      urlParams.tags,
      urlParams.sortBy,
      urlParams.page
    );
  }, [
    urlParams.search,
    urlParams.tags.join(","),
    urlParams.sortBy,
    urlParams.page,
  ]);

  // Fetch tags on mount
  useEffect(() => {
    fetchPopularTags();
  }, []);

  // Update URL with filters
  const updateURL = (
    newSearch: string,
    newTags: string[],
    newSortBy: string,
    newPage: number = 1
  ) => {
    const params = new URLSearchParams();

    if (newSearch) params.set("search", newSearch);
    if (newTags.length > 0) params.set("tags", newTags.join(","));
    if (newSortBy !== "newest") params.set("sortBy", newSortBy);
    if (newPage > 1) params.set("page", newPage.toString());

    const newUrl = params.toString()
      ? `/marketplace?${params.toString()}`
      : "/marketplace";
    router.push(newUrl);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL(searchQuery, selectedTags, sortBy);
  };

  // Handle tag click
  const handleTagClick = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      const newTags = [...selectedTags, tagName];
      setSelectedTags(newTags);
      updateURL(searchQuery, newTags, sortBy);
    }
  };

  // Remove tag
  const removeTag = (tagName: string) => {
    const newTags = selectedTags.filter((tag) => tag !== tagName);
    setSelectedTags(newTags);
    updateURL(searchQuery, newTags, sortBy);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    updateURL(searchQuery, selectedTags, newSortBy);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("newest");
    router.push("/marketplace");
  };

  const hasActiveFilters =
    urlParams.search ||
    urlParams.tags.length > 0 ||
    urlParams.sortBy !== "newest";
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
          <p className="text-gray-600">
            Discover amazing items from the AM-T community
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Search and Sort Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            {/* Sort */}
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Popular Tags */}
          {!isTagsLoading && popularTags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Popular tags:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.slice(0, 15).map((tag) => (
                  <Badge
                    key={tag.name}
                    variant={
                      selectedTags.includes(tag.name) ? "default" : "outline"
                    }
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleTagClick(tag.name)}
                  >
                    #{tag.name} ({tag.count})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Active filters:
              </span>
              {urlParams.search && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: "{urlParams.search}"
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      updateURL("", selectedTags, sortBy);
                    }}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {urlParams.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {urlParams.sortBy !== "newest" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Sort: {urlParams.sortBy}
                  <button
                    onClick={() => handleSortChange("newest")}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

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

        {/* Results count and pagination info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {isLoading
              ? "Loading..."
              : `${pagination.total} ${
                  pagination.total === 1 ? "item" : "items"
                } found`}
            {pagination.pages > 1 && (
              <span className="ml-2">
                (Page {pagination.page} of {pagination.pages})
              </span>
            )}
          </p>{" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              fetchListings(
                urlParams.search,
                urlParams.tags,
                urlParams.sortBy,
                urlParams.page
              )
            }
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size={64} color="#000000" />
          </div>
        ) : (
          <>
            {/* Listings Grid */}
            {listings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    showPrivateIndicator={false}
                    showEditOptions={false}
                    onTagClick={handleTagClick}
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
            )}{" "}
            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    updateURL(
                      urlParams.search,
                      urlParams.tags,
                      urlParams.sortBy,
                      urlParams.page - 1
                    )
                  }
                  disabled={urlParams.page <= 1}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                    .filter((page) => {
                      const current = urlParams.page;
                      return (
                        page === 1 ||
                        page === pagination.pages ||
                        (page >= current - 2 && page <= current + 2)
                      );
                    })
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="text-gray-400">...</span>
                        )}
                        <Button
                          variant={
                            page === urlParams.page ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            updateURL(
                              urlParams.search,
                              urlParams.tags,
                              urlParams.sortBy,
                              page
                            )
                          }
                        >
                          {page}
                        </Button>
                      </React.Fragment>
                    ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    updateURL(
                      urlParams.search,
                      urlParams.tags,
                      urlParams.sortBy,
                      urlParams.page + 1
                    )
                  }
                  disabled={urlParams.page >= pagination.pages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
