import React from "react";

interface PrivacySettingsProps {
  username: string;
}

export const PrivacySettings = ({ username }: PrivacySettingsProps) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Privacy Settings
      </h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              Profile Visibility
            </h3>
            <p className="text-sm text-gray-600">
              Control who can see your profile
            </p>
          </div>
          <select className="border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black">
            <option>Public</option>
            <option>Private</option>
            <option>Friends Only</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              Show Online Status
            </h3>
            <p className="text-sm text-gray-600">
              Let others see when you're active
            </p>
          </div>
          <input
            type="checkbox"
            className="rounded border-gray-300 text-black focus:ring-black"
          />
        </div>

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
            className="rounded border-gray-300 text-black focus:ring-black"
            defaultChecked
          />
        </div>

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
            className="rounded border-gray-300 text-black focus:ring-black"
            defaultChecked
          />
        </div>

        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          Save Privacy Settings
        </button>
      </div>
    </div>
  );
};
