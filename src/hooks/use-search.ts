import { useState, useEffect, useCallback } from "react";
import type { User, Listing } from "../generated/prisma";

type SearchType = "LISTINGS" | "USERS" | "ALL";

export const useSearch = (key: string, type: SearchType = "LISTINGS") => {
  // Input state
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  // Results state
  const [listings, setListings] = useState<Listing[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce query input with 500ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch search results when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setListings([]);
      setUsers([]);
      setError(null);
      return;
    }

    const searchListings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/search/listings?q=${encodeURIComponent(
            debouncedQuery
          )}&key=${key}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setListings(data.results || []);
        setError(null);
      } catch (err) {
        console.error("Error searching listings:", err);
        setError("Failed to search listings");
        setListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    const searchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/search/users?q=${encodeURIComponent(debouncedQuery)}&key=${key}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.results || []);
        setError(null);
      } catch (err) {
        console.error("Error searching users:", err);
        setError("Failed to search users");
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Determine which endpoints to call based on search type
    if (type === "LISTINGS" || type === "ALL") {
      searchListings();
    }

    if (type === "USERS" || type === "ALL") {
      searchUsers();
    }
  }, [debouncedQuery, key, type]);

  // Helper function to clear search
  const clearSearch = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    setListings([]);
    setUsers([]);
    setError(null);
  }, []);

  // Helper function to handle search input changes
  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  // Helper function for direct search submission
  const handleSearchSubmit = useCallback(async (submittedQuery: string) => {
    setQuery(submittedQuery);
    setDebouncedQuery(submittedQuery);
  }, []);

  return {
    // Input
    query,
    setQuery,
    debouncedQuery,
    handleSearchInput,
    handleSearchSubmit,

    // Results
    listings,
    users,

    // UI State
    isLoading,
    error,

    // Actions
    clearSearch,

    // Helper getters for specific search types
    results:
      type === "LISTINGS"
        ? listings
        : type === "USERS"
        ? users
        : [...listings, ...users],
    hasResults:
      (type === "LISTINGS" && listings.length > 0) ||
      (type === "USERS" && users.length > 0) ||
      (type === "ALL" && (listings.length > 0 || users.length > 0)),
  };
};
