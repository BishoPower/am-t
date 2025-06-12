import { usePopup } from "@/components/ui/popup";

// Simple popup notifications utility
export const createPopupUtils = (
  showPopup: ReturnType<typeof usePopup>["showPopup"]
) => ({
  success: (message: string, title?: string) => {
    showPopup({
      type: "success",
      title: title || "Success",
      message,
    });
  },

  error: (message: string, title?: string) => {
    showPopup({
      type: "error",
      title: title || "Error",
      message,
    });
  },

  info: (message: string, title?: string) => {
    showPopup({
      type: "info",
      title: title || "Info",
      message,
    });
  },

  warning: (message: string, title?: string) => {
    showPopup({
      type: "warning",
      title: title || "Warning",
      message,
    });
  },

  // Simple message without title
  message: (text: string) => {
    showPopup({
      type: "info",
      message: text,
    });
  },

  // Custom popup with action button
  withAction: (
    message: string,
    actionLabel: string,
    actionCallback: () => void,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    showPopup({
      type,
      message,
      action: {
        label: actionLabel,
        onClick: actionCallback,
      },
    });
  },
});
