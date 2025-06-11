import Link from "next/link";
import { Settings, User, Shield, Bell } from "lucide-react";
import { useSettings } from "./SettingsProvider";

interface SettingsNavigationProps {
  activeTab: string;
  username: string;
}

export const SettingsNavigation = ({
  activeTab,
  username,
}: SettingsNavigationProps) => {
  const { userData } = useSettings();

  // Use userData.username if available, fallback to the passed username
  const currentUsername = userData?.username || username;

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Settings },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <nav className="flex space-x-8 px-6" aria-label="Settings">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <Link
            key={tab.id}
            href={`/settings/${currentUsername}?tab=${tab.id}`}
            className={`${
              isActive
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
          >
            <Icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
