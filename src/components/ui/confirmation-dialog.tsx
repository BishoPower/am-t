"use client";

import React, { createContext, useContext, useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationDialog {
  id: string;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void;
  onCancel?: () => void;
}

interface ConfirmationContextType {
  dialogs: ConfirmationDialog[];
  showConfirmation: (dialog: Omit<ConfirmationDialog, "id">) => void;
  removeDialog: (id: string) => void;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(
  undefined
);

export function ConfirmationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dialogs, setDialogs] = useState<ConfirmationDialog[]>([]);

  const showConfirmation = (dialog: Omit<ConfirmationDialog, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newDialog = { ...dialog, id };
    setDialogs((prev) => [...prev, newDialog]);
  };

  const removeDialog = (id: string) => {
    setDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
  };

  return (
    <ConfirmationContext.Provider
      value={{ dialogs, showConfirmation, removeDialog }}
    >
      {children}
      <ConfirmationContainer />
    </ConfirmationContext.Provider>
  );
}

function ConfirmationContainer() {
  const { dialogs } = useConfirmation();

  if (dialogs.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[10000]">
      {dialogs.map((dialog) => (
        <ConfirmationItem key={dialog.id} dialog={dialog} />
      ))}
    </div>
  );
}

function ConfirmationItem({ dialog }: { dialog: ConfirmationDialog }) {
  const { removeDialog } = useConfirmation();
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleConfirm = () => {
    dialog.onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    if (dialog.onCancel) {
      dialog.onCancel();
    }
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => removeDialog(dialog.id), 200);
  };

  const getButtonStyles = () => {
    if (dialog.variant === "destructive") {
      return {
        confirm: "bg-red-600 text-white hover:bg-red-700 border-red-600",
        cancel: "bg-white text-black border-gray-300 hover:bg-gray-50",
      };
    }
    return {
      confirm: "bg-black text-white hover:bg-gray-800 border-black",
      cancel: "bg-white text-black border-gray-300 hover:bg-gray-50",
    };
  };

  const buttonStyles = getButtonStyles();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-200",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={handleCancel}
      />

      {/* Dialog */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className={cn(
            "bg-white rounded-lg shadow-xl border border-gray-300 max-w-md w-full transform transition-all duration-200",
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {dialog.variant === "destructive" && (
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-black">
                  {dialog.title}
                </h3>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-gray-700 text-sm leading-relaxed">
                {dialog.message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
                  buttonStyles.cancel
                )}
              >
                {dialog.cancelText || "Cancel"}
              </button>
              <button
                onClick={handleConfirm}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md border transition-colors",
                  buttonStyles.confirm
                )}
              >
                {dialog.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function useConfirmation() {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      "useConfirmation must be used within a ConfirmationProvider"
    );
  }
  return context;
}

// Utility function for easier usage
export const createConfirmationUtils = (
  showConfirmation: ReturnType<typeof useConfirmation>["showConfirmation"]
) => ({
  confirm: (
    title: string,
    message: string,
    onConfirm: () => void,
    options?: {
      confirmText?: string;
      cancelText?: string;
      variant?: "default" | "destructive";
      onCancel?: () => void;
    }
  ) => {
    showConfirmation({
      title,
      message,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText,
      variant: options?.variant || "default",
      onConfirm,
      onCancel: options?.onCancel,
    });
  },

  confirmDelete: (
    itemName: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    showConfirmation({
      title: "Delete Confirmation",
      message: `Are you sure you want to delete ${itemName}? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm,
      onCancel,
    });
  },

  confirmAction: (
    action: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    showConfirmation({
      title: `Confirm ${action}`,
      message,
      confirmText: action,
      cancelText: "Cancel",
      variant: "default",
      onConfirm,
      onCancel,
    });
  },
});
