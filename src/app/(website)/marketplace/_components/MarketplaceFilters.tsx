"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

interface PopularTag {
  name: string;
  count: number;
}

export default function MarketplaceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [popularTags, setPopularTags] = useState<PopularTag[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);

  // Get current filter values from URL
  const currentSearch = searchParams.get("search") || "";
  const currentTags =
    searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const currentSortBy = searchParams.get("sortBy") || "newest";

  // Initialize search input from URL
  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  // Fetch popular tags
  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        const response = await fetch("/api/search/tags?popular=true&limit=20");
        if (response.ok) {
          const tags = await response.json();
          setPopularTags(tags);
        }
      } catch (error) {
        console.error("Failed to fetch popular tags:", error);
      }
    };
    fetchPopularTags();
  }, []);

  const updateURL = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    // Always reset to page 1 when filters change
    newParams.delete("page");

    router.push(`/marketplace?${newParams.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: searchInput.trim() });
  };

  const handleTagClick = (tagName: string) => {
    const newTags = [...currentTags];
    const tagIndex = newTags.indexOf(tagName);

    if (tagIndex >= 0) {
      // Remove tag if already selected
      newTags.splice(tagIndex, 1);
    } else {
      // Add tag if not selected
      newTags.push(tagName);
    }

    updateURL({ tags: newTags.length > 0 ? newTags.join(",") : null });
  };

  const handleSortChange = (value: string) => {
    updateURL({ sortBy: value });
  };

  const clearSearch = () => {
    setSearchInput("");
    updateURL({ search: null });
  };

  const displayedTags = showAllTags ? popularTags : popularTags.slice(0, 10);

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search listings..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 pr-10 h-12 text-base border-gray-300 focus:border-black focus:ring-black"
            />
            {searchInput && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>

        {/* Sort */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={currentSortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="h-12 border-gray-300 focus:border-black focus:ring-black">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="title-asc">Title A-Z</SelectItem>
              <SelectItem value="title-desc">Title Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Popular Tags */}
      {popularTags.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Popular Tags</h3>
            {popularTags.length > 10 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllTags(!showAllTags)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                {showAllTags ? "Show less" : `Show all (${popularTags.length})`}
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {displayedTags.map((tag) => {
              const isSelected = currentTags.includes(tag.name);
              return (
                <Badge
                  key={tag.name}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-black text-white hover:bg-gray-800"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleTagClick(tag.name)}
                >
                  #{tag.name}
                  <span className="ml-1 text-xs opacity-70">({tag.count})</span>
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
