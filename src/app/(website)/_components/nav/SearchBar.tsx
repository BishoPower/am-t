"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearch } from "@/hooks/use-search";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeFilter, setActiveFilter] = useState<
    "ALL" | "LISTINGS" | "USERS"
  >("ALL");
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Use the search hook
  const {
    query,
    handleSearchInput,
    clearSearch,
    listings,
    users,
    isLoading,
    error,
    hasResults,
  } = useSearch("public", "ALL");

  const allResults = [...listings, ...users];

  // Load recent searches on component mount
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading recent searches", e);
      }
    }
  }, []);

  // Save search when submitted
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      // Save to recent searches
      const updated = [
        query,
        ...recentSearches.filter((s) => s !== query),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
    setShowResults(false);
  };

  // Close results dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if click was on the magnifying glass
      const isSearchIcon = (event.target as Element)?.closest(
        '[aria-label="Show search"]'
      );

      if (isSearchIcon) {
        return; // Don't close if clicking search icon
      }

      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  // Add a resize listener
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Improve the mobile focus behavior
  const handleFocus = () => {
    setShowResults(true);
    if (isMobile) {
      // On mobile, ensure input is visible when keyboard appears
      setTimeout(() => {
        inputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  // Add a dedicated function to handle the search icon click
  const handleSearchIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Focus input and show results
    if (inputRef.current) {
      inputRef.current.focus();
      setShowResults(true);
    }

    // Debug to see if this is being triggered
    console.log("Search icon clicked, screen width:", window.innerWidth);
  };

  return (
    <div className="relative w-full">
      {/* Modify your form container to ensure proper positioning context */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between p-px w-full bg-white rounded-sm border border-black border-solid max-w-[550px] min-w-[100px] min-h-[42px] relative z-10"
      >
        {/* Update the magnifying glass container */}
        <div
          className="search-icon-container flex justify-center items-center px-4 py-3.5 h-full w-[45px] cursor-pointer"
          onClick={handleSearchIconClick}
          role="button"
          tabIndex={0}
          aria-label="Show search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600 pointer-events-none" // Add pointer-events-none here
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div className="flex flex-1 items-center pr-1 h-full min-w-[50px]">
          <label htmlFor="searchInput" className="sr-only">
            Search
          </label>
          <input
            id="searchInput"
            ref={inputRef}
            type="search"
            value={query}
            onChange={handleSearchInput}
            onFocus={handleFocus}
            placeholder="Search"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((prev) =>
                  prev < allResults.length - 1 ? prev + 1 : 0
                );
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((prev) =>
                  prev > 0 ? prev - 1 : allResults.length - 1
                );
              } else if (e.key === "Enter" && activeIndex >= 0) {
                e.preventDefault();
                resultRefs.current[activeIndex]?.click();
              } else if (e.key === "Escape") {
                setShowResults(false);
              }
            }}
            className="flex-grow px-0.5 py-3 text-sm text-neutral-500 border-none focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2.5 text-xs font-medium tracking-wide leading-none text-center text-black uppercase bg-white border border-solid border-neutral-200 min-h-[32px] min-w-[75px]"
          >
            Search
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && !isMobile && (query || isLoading) && (
        <div
          ref={resultsRef}
          className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-y-auto"
        >
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-pulse flex justify-center">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          )}

          {error && <div className="p-4 text-center text-red-500">{error}</div>}

          {!isLoading && !error && query && !hasResults && (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}

          {/* Filter Tabs */}
          {showResults && query && (
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeFilter === "ALL"
                      ? "border-b-2 border-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveFilter("ALL")}
                >
                  All Results
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeFilter === "LISTINGS"
                      ? "border-b-2 border-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveFilter("LISTINGS")}
                >
                  Listings
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeFilter === "USERS"
                      ? "border-b-2 border-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveFilter("USERS")}
                >
                  Users
                </button>
              </div>
            </div>
          )}

          {/* Listings Results */}
          {(activeFilter === "ALL" || activeFilter === "LISTINGS") &&
            listings.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-100 text-xs font-semibold uppercase tracking-wide flex justify-between">
                  <span>Listings</span>
                  <span className="text-gray-500">
                    {listings.length} results
                  </span>
                </div>
                <ul>
                  {listings.map((listing, index) => (
                    <li key={listing.id}>
                      <Link
                        ref={(el) => {
                          // Track the current index in the combined results
                          const idx = listings.indexOf(listing);
                          resultRefs.current[idx] = el;
                        }}
                        href={`/listing/${listing.id}`}
                        className={`flex items-center p-3 hover:bg-gray-50 transition-colors ${
                          activeIndex === listings.indexOf(listing)
                            ? "bg-gray-100"
                            : ""
                        }`}
                        onClick={() => setShowResults(false)}
                      >
                        {listing.imageUrls && listing.imageUrls[0] ? (
                          <div className="w-12 h-12 mr-3 relative overflow-hidden rounded">
                            <Image
                              src={listing.imageUrls[0]}
                              alt={listing.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 mr-3 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-sm">
                            {listing.title}
                          </h4>
                          <p className="text-xs text-gray-600 truncate">
                            {listing.description?.substring(0, 60)}
                            {(listing.description?.length || 0) > 60
                              ? "..."
                              : ""}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Users Results */}
          {(activeFilter === "ALL" || activeFilter === "USERS") &&
            users.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-100 text-xs font-semibold uppercase tracking-wide">
                  Users
                </div>
                <ul>
                  {users.map((user) => (
                    <li key={user.id}>
                      <Link
                        href={`/profile/${user.username}`}
                        className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowResults(false)}
                      >
                        {user.image ? (
                          <div className="w-12 h-12 mr-3 relative overflow-hidden rounded-full">
                            <Image
                              src={user.image}
                              alt={user.username || "User"}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 mr-3 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-lg font-medium text-gray-600">
                              {(user.firstName?.[0] || "") +
                                (user.lastName?.[0] || "")}
                            </span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-sm">
                            @{user.username}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {user.firstName} {user.lastName}
                            {/* Safe access to _count using optional chaining */}
                            {(user as any)._count?.listings !== undefined &&
                              ` · ${(user as any)._count.listings} listing${
                                (user as any)._count.listings !== 1 ? "s" : ""
                              }`}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}

      {/* Recent Searches Dropdown - Shown when input is focused but empty */}
      {showResults && !query && recentSearches.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <div className="flex justify-between px-4 py-2 bg-gray-100">
            <span className="text-xs font-semibold uppercase tracking-wide">
              Recent Searches
            </span>
            <button
              className="text-xs text-gray-500 hover:text-gray-700"
              onClick={() => {
                setRecentSearches([]);
                localStorage.removeItem("recentSearches");
              }}
            >
              Clear
            </button>
          </div>
          <ul>
            {recentSearches.map((term, i) => (
              <li key={i}>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => {
                    handleSearchInput({ target: { value: term } } as any);
                    setShowResults(true);
                  }}
                >
                  {term}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Desktop Search Results Dropdown */}
      {showResults && !isMobile && (query || isLoading) && (
        <div
          ref={resultsRef}
          className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-y-auto"
        >
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-pulse flex justify-center">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          )}

          {error && <div className="p-4 text-center text-red-500">{error}</div>}

          {!isLoading && !error && query && !hasResults && (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}

          {/* Filter Tabs */}
          {showResults && query && (
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeFilter === "ALL"
                      ? "border-b-2 border-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveFilter("ALL")}
                >
                  All Results
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeFilter === "LISTINGS"
                      ? "border-b-2 border-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveFilter("LISTINGS")}
                >
                  Listings
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeFilter === "USERS"
                      ? "border-b-2 border-black"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveFilter("USERS")}
                >
                  Users
                </button>
              </div>
            </div>
          )}

          {/* Listings Results */}
          {(activeFilter === "ALL" || activeFilter === "LISTINGS") &&
            listings.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-100 text-xs font-semibold uppercase tracking-wide flex justify-between">
                  <span>Listings</span>
                  <span className="text-gray-500">
                    {listings.length} results
                  </span>
                </div>
                <ul>
                  {listings.map((listing, index) => (
                    <li key={listing.id}>
                      <Link
                        ref={(el) => {
                          // Track the current index in the combined results
                          const idx = listings.indexOf(listing);
                          resultRefs.current[idx] = el;
                        }}
                        href={`/listing/${listing.id}`}
                        className={`flex items-center p-3 hover:bg-gray-50 transition-colors ${
                          activeIndex === listings.indexOf(listing)
                            ? "bg-gray-100"
                            : ""
                        }`}
                        onClick={() => setShowResults(false)}
                      >
                        {listing.imageUrls && listing.imageUrls[0] ? (
                          <div className="w-12 h-12 mr-3 relative overflow-hidden rounded">
                            <Image
                              src={listing.imageUrls[0]}
                              alt={listing.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 mr-3 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-sm">
                            {listing.title}
                          </h4>
                          <p className="text-xs text-gray-600 truncate">
                            {listing.description?.substring(0, 60)}
                            {(listing.description?.length || 0) > 60
                              ? "..."
                              : ""}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Users Results */}
          {(activeFilter === "ALL" || activeFilter === "USERS") &&
            users.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-100 text-xs font-semibold uppercase tracking-wide">
                  Users
                </div>
                <ul>
                  {users.map((user) => (
                    <li key={user.id}>
                      <Link
                        href={`/profile/${user.username}`}
                        className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowResults(false)}
                      >
                        {user.image ? (
                          <div className="w-12 h-12 mr-3 relative overflow-hidden rounded-full">
                            <Image
                              src={user.image}
                              alt={user.username || "User"}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 mr-3 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-lg font-medium text-gray-600">
                              {(user.firstName?.[0] || "") +
                                (user.lastName?.[0] || "")}
                            </span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-sm">
                            @{user.username}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {user.firstName} {user.lastName}
                            {/* Safe access to _count using optional chaining */}
                            {(user as any)._count?.listings !== undefined &&
                              ` · ${(user as any)._count.listings} listing${
                                (user as any)._count.listings !== 1 ? "s" : ""
                              }`}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}

      {/* Recent Searches Dropdown - Shown when input is focused but empty */}
      {showResults && !query && recentSearches.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <div className="flex justify-between px-4 py-2 bg-gray-100">
            <span className="text-xs font-semibold uppercase tracking-wide">
              Recent Searches
            </span>
            <button
              className="text-xs text-gray-500 hover:text-gray-700"
              onClick={() => {
                setRecentSearches([]);
                localStorage.removeItem("recentSearches");
              }}
            >
              Clear
            </button>
          </div>
          <ul>
            {recentSearches.map((term, i) => (
              <li key={i}>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => {
                    handleSearchInput({ target: { value: term } } as any);
                    setShowResults(true);
                  }}
                >
                  {term}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mobile search overlay - shown when search is clicked */}
      {showResults && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[110] flex items-start justify-center pt-16"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowResults(false);
            }
          }}
        >
          <div
            className="w-full max-w-md bg-white rounded-md shadow-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Search</h3>
                <button
                  onClick={() => setShowResults(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search input for mobile overlay */}
              <div className="flex items-center border border-gray-300 rounded-md mb-4">
                <input
                  type="search"
                  value={query}
                  onChange={handleSearchInput}
                  placeholder="Search"
                  className="flex-grow px-3 py-2 text-sm border-none focus:outline-none focus:ring-0"
                  autoFocus
                />
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Display search results inside the mobile overlay */}
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="animate-pulse flex justify-center">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Rest of your search results logic */}
                  {/* You can reuse your existing results UI code here */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

<div className="relative flex-grow mx-6 lg:mx-10 max-w-3xl">
  <SearchBar onSearch={handleSearch} />
</div>;
function handleSearch(query: string): void {
  throw new Error("Function not implemented.");
}
