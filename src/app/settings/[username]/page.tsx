"use client";

import React from "react";
import { SettingsNavigation } from "@/components/settings/SettingsNavigation";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { PrivacySettings } from "@/components/settings/PrivacySettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { useSettings } from "@/components/settings/SettingsProvider";

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ tab?: string }>;
};

const SettingsPage = ({ params, searchParams }: Props) => {
  const resolvedParams = React.use(params);
  const resolvedSearchParams = React.use(searchParams);
  const activeTab = resolvedSearchParams.tab || "profile";
  const { userData } = useSettings();
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings username={resolvedParams.username} />;
      case "account":
        return (
          <AccountSettings
            username={resolvedParams.username}
            userEmail={userData?.email}
            userPhone={undefined}
          />
        );
      case "privacy":
        return <PrivacySettings username={resolvedParams.username} />;
      case "notifications":
        return <NotificationSettings username={resolvedParams.username} />;
      default:
        return <ProfileSettings username={resolvedParams.username} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your account settings and preferences
          </p>
        </div>{" "}
        {/* Settings Navigation */}
        <SettingsNavigation
          activeTab={activeTab}
          username={resolvedParams.username}
        />
      </div>

      {/* Settings Content */}
      <div className="bg-white shadow rounded-lg">{renderContent()}</div>
    </div>
  );
};

export default SettingsPage;
