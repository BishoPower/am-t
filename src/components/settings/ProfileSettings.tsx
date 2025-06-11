import React from "react";
import { useSettings } from "./SettingsProvider";

interface ProfileSettingsProps {
  username: string;
}

export const ProfileSettings = ({ username }: ProfileSettingsProps) => {
  const { userData, isLoading, error } = useSettings();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">Error loading profile data: {error}</div>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Profile Information
      </h2>
      <div className="space-y-6">
        {" "}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            defaultValue={userData?.username || username}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            disabled
          />
        </div>{" "}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Display Name
          </label>
          <input
            type="text"
            defaultValue={
              userData?.firstName && userData?.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : userData?.firstName || ""
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            placeholder="Your display name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            rows={3}
            defaultValue={userData?.bio || ""}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            placeholder="Tell others about yourself..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            defaultValue={userData?.location || ""}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            placeholder="City, State"
          />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};
