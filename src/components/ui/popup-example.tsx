"use client";

import React, { useState } from "react";
import { usePopup } from "@/components/ui/popup";
import { createPopupUtils } from "@/lib/popup";

export function PopupExample() {
  const { showPopup } = usePopup();
  const popup = createPopupUtils(showPopup);

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-bold">Custom Popup Examples</h2>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => popup.success("Operation completed successfully!")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Success Popup
        </button>

        <button
          onClick={() => popup.error("Something went wrong. Please try again.")}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Error Popup
        </button>

        <button
          onClick={() => popup.info("Here's some useful information for you.")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Info Popup
        </button>

        <button
          onClick={() => popup.warning("Please be careful with this action.")}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Warning Popup
        </button>

        <button
          onClick={() => popup.message("Simple message without a title")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Simple Message
        </button>

        <button
          onClick={() =>
            popup.withAction(
              "Do you want to continue?",
              "Yes, Continue",
              () => popup.success("Action confirmed!"),
              "info"
            )
          }
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          With Action Button
        </button>
      </div>
    </div>
  );
}
