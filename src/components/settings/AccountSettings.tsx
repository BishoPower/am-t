import React, { useState } from "react";
import { useSettings } from "./SettingsProvider";
import { useRouter } from "next/navigation";
import { usePopup } from "@/components/ui/popup";
import { createPopupUtils } from "@/lib/popup";
import {
  useConfirmation,
  createConfirmationUtils,
} from "@/components/ui/confirmation-dialog";

interface AccountSettingsProps {
  username: string;
  userEmail?: string;
  userPhone?: string;
}

export const AccountSettings = ({
  username,
  userEmail,
  userPhone,
}: AccountSettingsProps) => {
  const { userData, isLoading, error } = useSettings();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const { showPopup } = usePopup();
  const popup = createPopupUtils(showPopup);
  const { showConfirmation } = useConfirmation();
  const confirmation = createConfirmationUtils(showConfirmation);

  const performDelete = async () => {
    setDeleting(true);
    popup.info("Deleting account...");

    try {
      const res = await fetch("/api/user/delete", { method: "POST" });
      if (res.ok) {
        popup.success("Account deleted successfully");
        setTimeout(() => {
          window.location.href = "/sign-out";
        }, 1000);
      } else {
        popup.error("Failed to delete account. Please try again.");
        setDeleting(false);
      }
    } catch (error) {
      popup.error("An error occurred while deleting your account.");
      setDeleting(false);
    }
  };

  const handleDelete = () => {
    confirmation.confirm(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, listings, and account information.",
      performDelete,
      {
        confirmText: "Delete Account",
        cancelText: "Cancel",
        variant: "destructive",
        onCancel: () => {
          // Optional: Do something when user cancels
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">Error loading account data: {error}</div>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Account Settings
      </h2>
      <div className="space-y-6">
        {" "}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            defaultValue={userData?.email || userEmail}
            placeholder={userData?.email || userEmail || "your@email.com"}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            // defaultValue={userData?.phone || userPhone}
            // placeholder={userData?.phone || userPhone || "+1 (555) 123-4567"}
          />
        </div>
        <div className="border-t pt-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Password</h3>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
            Change Password
          </button>
        </div>{" "}
        <div className="border-t pt-6">
          <h3 className="text-base font-medium text-red-600 mb-4">
            Danger Zone
          </h3>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
};
