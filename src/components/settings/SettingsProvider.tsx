"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "@/actions/username";
import { useAuth } from "@clerk/nextjs";

interface UserData {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  image: string | null;
  bio: string | null;
  location: string | null;
  createdAt: Date;
}

interface SettingsContextType {
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
  refreshUserData: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider"
    );
  }
  return context;
};

// Alias for convenience
export const useSettings = useSettingsContext;

interface SettingsProviderProps {
  children: React.ReactNode;
  username: string;
}

export const SettingsProvider = ({
  children,
  username,
}: SettingsProviderProps) => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const result = await getUserData(username);
      if (result.status === 200) {
        return result.data;
      }
      throw new Error(result.error || "Failed to fetch user data");
    },
    enabled: !!username,
    staleTime: 0, // Always refetch to ensure fresh data
    refetchOnWindowFocus: true,
  });

  const refreshUserData = () => {
    // Invalidate all user-related queries to ensure fresh data
    queryClient.invalidateQueries({ queryKey: ["user", username] });
    refetch();
  };

  // Refresh data when username changes (navigation between settings subpages)
  useEffect(() => {
    if (username) {
      refreshUserData();
    }
  }, [username]);

  const value: SettingsContextType = {
    userData: data || null,
    isLoading,
    error: error?.message || null,
    refreshUserData,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
