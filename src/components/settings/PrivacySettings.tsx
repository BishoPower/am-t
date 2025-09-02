"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BlockedUsersManager from "@/components/user/BlockedUsersManager";

interface PrivacySettingsProps {
  username: string;
}

type PrivacySettings = {
  profileVisibility: "PUBLIC" | "PRIVATE" | "FRIENDS_ONLY";
  allowDirectMessages: boolean;
  showTradingHistory: boolean;
};

export const PrivacySettings = ({ username }: PrivacySettingsProps) => {
  const [settings, setSettings] = useState<PrivacySettings>({
    profileVisibility: "PUBLIC",
    allowDirectMessages: true,
    showTradingHistory: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load current privacy settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/user/privacy");
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Failed to load privacy settings:", error);
        toast({
          title: "Error",
          description: "Failed to load privacy settings",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [toast]);

  // Save privacy settings
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/user/privacy", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
        toast({
          title: "Success",
          description: "Privacy settings updated successfully",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update settings");
      }
    } catch (error) {
      console.error("Failed to save privacy settings:", error);
      toast({
        title: "Error",
        description: "Failed to update privacy settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: keyof PrivacySettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Privacy Settings
      </h2>
      <div className="space-y-6">
        {/* Profile Visibility */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              Profile Visibility
            </h3>
            <p className="text-sm text-gray-600">
              Control who can see your profile
            </p>
          </div>
          <select
            value={settings.profileVisibility}
            onChange={(e) => updateSetting("profileVisibility", e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
            <option value="FRIENDS_ONLY">Friends Only</option>
          </select>
        </div>

        {/* Allow Direct Messages */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              Allow Direct Messages
            </h3>
            <p className="text-sm text-gray-600">
              Receive messages from other users
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.allowDirectMessages}
            onChange={(e) =>
              updateSetting("allowDirectMessages", e.target.checked)
            }
            className="rounded border-gray-300 text-black focus:ring-black"
          />
        </div>

        {/* Show Trading History */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              Show Trading History
            </h3>
            <p className="text-sm text-gray-600">
              Display your trading activity on your profile
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.showTradingHistory}
            onChange={(e) =>
              updateSetting("showTradingHistory", e.target.checked)
            }
            className="rounded border-gray-300 text-black focus:ring-black"
          />
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-black text-white hover:bg-gray-800 transition-colors"
        >
          {isSaving ? "Saving..." : "Save Privacy Settings"}
        </Button>

        {/* Blocked Users Management */}
        <div className="pt-6 border-t">
          <BlockedUsersManager />
        </div>
      </div>
    </div>
  );
};
