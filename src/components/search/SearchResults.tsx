"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ListingCard from "@/components/listing/ListingCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Sparkles } from "lucide-react";
import Spinner from "@/components/global/loader/spinner";

type SearchResultsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const SearchResults = ({ searchParams }: SearchResultsProps) => {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [listings, setListings] = useState<any[]>([]);
  const [originalListings, setOriginalListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0); // Get parameters from URL (try both server and client methods)
  const similar = searchParams.similar as string;
  let query = searchParams.q as string;
  const tags = searchParams.tags as string;

  // Fallback to client-side URL parsing if server-side params are empty
  const clientQuery = urlSearchParams.get("q");
  const clientSimilar = urlSearchParams.get("similar");
  const clientTags = urlSearchParams.get("tags");

  if (!query && clientQuery) {
    query = clientQuery;
  }

  // Use client-side parameters if server-side is undefined
  const finalSimilar = similar || clientSimilar;
  const finalTags = tags || clientTags;
  // Handle case where similar parameter exists but is empty
  useEffect(() => {
    if (
      (searchParams.similar !== undefined || clientSimilar !== null) &&
      (!finalSimilar || finalSimilar.trim() === "")
    ) {
      // If similar parameter exists but is empty, redirect to normal search
      router.push("/search");
      return;
    }
  }, [searchParams.similar, clientSimilar, finalSimilar, router]);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        let url = "";
        console.log(
          "SearchResults - similar:",
          finalSimilar,
          "clientSimilar:",
          clientSimilar,
          "searchParams.similar:",
          searchParams.similar,
          "query:",
          query,
          "query type:",
          typeof query,
          "query length:",
          query?.length,
          "tags:",
          finalTags,
          "clientTags:",
          clientTags,
          "searchParams.tags:",
          searchParams.tags
        );
        if (finalSimilar && finalSimilar.trim() !== "") {
          // Fetch similar listings
          url = `/api/listings/${finalSimilar}/similar?limit=24`;
        } else if (query && query.trim() !== "") {
          // Regular search - ensure we have a valid query
          const searchUrl = new URLSearchParams();
          searchUrl.append("q", query.trim());
          if (finalTags) searchUrl.append("tags", finalTags);
          url = `/api/search/listings?${searchUrl.toString()}`;
        } else if (finalTags && finalTags.trim() !== "") {
          // Tag-only search
          const searchUrl = new URLSearchParams();
          searchUrl.append("tags", finalTags);
          url = `/api/search/listings?${searchUrl.toString()}`;
        } else {
          // Default: fetch recent listings
          url = `/api/listings?limit=24`;
        }
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (finalSimilar && finalSimilar.trim() !== "") {
            const resultData = Array.isArray(data) ? data : [];
            setOriginalListings(resultData);
            setListings(resultData);
            setTotalResults(resultData.length);
          } else if (data.results && Array.isArray(data.results)) {
            // Search API returns { results: [...] }
            console.log(
              "Setting listings from search results:",
              data.results.map((l: any) => ({ id: l.id, title: l.title }))
            );
            setOriginalListings(data.results);
            setListings(data.results);
            setTotalResults(data.results.length);
          } else if (data.listings && Array.isArray(data.listings)) {
            // Regular listings API returns { listings: [...] }
            console.log(
              "Setting listings from regular API:",
              data.listings.map((l: any) => ({ id: l.id, title: l.title }))
            );
            setOriginalListings(data.listings);
            setListings(data.listings);
            setTotalResults(data.listings.length);
          } else if (Array.isArray(data)) {
            // Direct array response
            console.log(
              "Setting listings from direct array:",
              data.map((l: any) => ({ id: l.id, title: l.title }))
            );
            setOriginalListings(data);
            setListings(data);
            setTotalResults(data.length);
          } else {
            console.error("Unexpected data structure:", data);
            setOriginalListings([]);
            setListings([]);
            setTotalResults(0);
          }
        } else {
          console.error("Response not ok:", await response.text());
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [finalSimilar, query, finalTags]);
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  // Filter listings based on the filter query
  useEffect(() => {
    if (!filterQuery.trim()) {
      // No filter, show all original listings
      setListings(originalListings);
    } else {
      // Filter the original listings
      const filtered = originalListings.filter((listing) => {
        const searchTerm = filterQuery.toLowerCase();
        const title = listing.title?.toLowerCase() || "";
        const description = listing.description?.toLowerCase() || "";
        const tags =
          listing.tags?.map((tag: any) => tag.name.toLowerCase()) || [];

        return (
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          tags.some((tag: string) => tag.includes(searchTerm))
        );
      });
      setListings(filtered);
    }
  }, [filterQuery, originalListings]);
  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering happens automatically via the useEffect above
  };

  const clearFilter = () => {
    setFilterQuery("");
  };

  const handleTagClick = (tagName: string) => {
    // Navigate to search results filtered by the clicked tag
    router.push(`/search?tags=${encodeURIComponent(tagName)}`);
  };
  const getPageTitle = () => {
    if (finalSimilar && finalSimilar.trim() !== "") {
      return "Similar Items";
    } else if (query) {
      return `Search results for "${query}"`;
    } else if (finalTags) {
      return `Items tagged with "${finalTags}"`;
    } else {
      return "Recent Listings";
    }
  };
  const getPageDescription = () => {
    if (finalSimilar && finalSimilar.trim() !== "") {
      return "Items that are similar to the one you were viewing";
    } else if (filterQuery.trim()) {
      return `${listings.length} of ${totalResults} item${
        listings.length !== 1 ? "s" : ""
      } shown (filtered)`;
    } else if (totalResults > 0) {
      return `${totalResults} item${totalResults !== 1 ? "s" : ""} found`;
    } else {
      return "No items found";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {" "}
            {finalSimilar && finalSimilar.trim() !== "" ? (
              <Sparkles className="h-6 w-6 text-yellow-500" />
            ) : (
              <Search className="h-6 w-6 text-gray-600" />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600 mt-1">{getPageDescription()}</p>
            </div>
          </div>{" "}
          {/* Filter Bar */}
          {!finalSimilar && (
            <form onSubmit={handleFilter} className="max-w-2xl">
              <div className="flex items-center justify-between p-px w-full bg-white rounded-sm border border-black border-solid max-w-[550px] min-w-[100px] min-h-[42px] relative z-10">
                {/* Search icon */}
                <div className="search-icon-container flex justify-center items-center px-4 py-3.5 h-full w-[45px]">
                  <Filter className="h-4 w-4 text-gray-600" />
                </div>

                {/* Input and button container */}
                <div className="flex flex-1 items-center pr-1 h-full min-w-[50px]">
                  <input
                    type="search"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder="Filter results..."
                    className="flex-grow px-0.5 py-3 text-sm text-neutral-500 border-none focus:outline-none"
                  />
                  {filterQuery && (
                    <button
                      type="button"
                      onClick={clearFilter}
                      className="px-2 py-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2.5 text-xs font-medium tracking-wide leading-none text-center text-black uppercase bg-white border border-solid border-neutral-200 min-h-[32px] min-w-[75px]"
                  >
                    Filter
                  </button>
                </div>
              </div>
            </form>
          )}{" "}
          {/* Active Filters */}
          {(query || tags || filterQuery) && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-gray-500">Active filters:</span>
              {query && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {query}
                  <button
                    onClick={() => router.push("/search")}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {tags && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Tag: {tags}
                  <button
                    onClick={() => {
                      const newParams = new URLSearchParams(urlSearchParams);
                      newParams.delete("tags");
                      router.push(`/search?${newParams.toString()}`);
                    }}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filterQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Filter: {filterQuery}
                  <button
                    onClick={clearFilter}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>{" "}
        {/* Results */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Spinner size={48} color="#000000" />
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="group">
                {" "}
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
                    <span>{listing.favorites?.length || 0} ♥</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No items found
              </h3>{" "}
              <p className="text-gray-600 mb-6">
                {finalSimilar && finalSimilar.trim() !== ""
                  ? "We couldn't find any similar items. Try browsing other listings."
                  : "Try adjusting your search terms or browse all listings."}
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => router.push("/search")}
                >
                  Clear Search
                </Button>
                <Button onClick={() => router.push("/")}>Browse All</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
