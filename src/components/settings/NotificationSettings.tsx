import React from "react";

interface NotificationSettingsProps {
  username: string;
}

export const NotificationSettings = ({
  username,
}: NotificationSettingsProps) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Notification Preferences
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Email Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  New Messages
                </p>
                <p className="text-xs text-gray-600">
                  Get notified when you receive new messages
                </p>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-black focus:ring-black"
                defaultChecked
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Trade Requests
                </p>
                <p className="text-xs text-gray-600">
                  Get notified about trade requests
                </p>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-black focus:ring-black"
                defaultChecked
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  New Listings
                </p>
                <p className="text-xs text-gray-600">
                  Get notified about new items in categories you follow
                </p>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-black focus:ring-black"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Push Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Instant Messages
                </p>
                <p className="text-xs text-gray-600">
                  Real-time notifications for new messages
                </p>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-black focus:ring-black"
                defaultChecked
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Trade Updates
                </p>
                <p className="text-xs text-gray-600">
                  Updates on your ongoing trades
                </p>
              </div>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-black focus:ring-black"
                defaultChecked
              />
            </div>
          </div>
        </div>

        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};
