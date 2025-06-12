"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { X, CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type PopupType = "success" | "error" | "info" | "warning";

interface Popup {
  id: string;
  type: PopupType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface PopupContextType {
  popups: Popup[];
  showPopup: (popup: Omit<Popup, "id">) => void;
  removePopup: (id: string) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [popups, setPopups] = useState<Popup[]>([]);

  const showPopup = (popup: Omit<Popup, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newPopup = { ...popup, id };

    setPopups((prev) => [...prev, newPopup]);

    // Auto remove after duration (default 5 seconds)
    setTimeout(() => {
      removePopup(id);
    }, popup.duration || 5000);
  };

  const removePopup = (id: string) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id));
  };

  return (
    <PopupContext.Provider value={{ popups, showPopup, removePopup }}>
      {children}
      <PopupContainer />
    </PopupContext.Provider>
  );
}

function PopupContainer() {
  const { popups } = usePopup();

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      {popups.map((popup) => (
        <PopupItem key={popup.id} popup={popup} />
      ))}
    </div>
  );
}

function PopupItem({ popup }: { popup: Popup }) {
  const { removePopup } = usePopup();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => removePopup(popup.id), 200);
  };
  const getIcon = () => {
    switch (popup.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-black" />;
      case "error":
        return <XCircle className="h-5 w-5 text-black" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-black" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-black" />;
    }
  };

  const getBorderColor = () => {
    switch (popup.type) {
      case "success":
        return "border-l-black bg-green-50";
      case "error":
        return "border-l-black bg-red-50";
      case "warning":
        return "border-l-black bg-yellow-50";
      case "info":
      default:
        return "border-l-black bg-gray-50";
    }
  };

  return (
    <div
      className={cn(
        "min-w-[320px] max-w-[420px] border border-gray-300 rounded-lg shadow-lg border-l-4 transition-all duration-200 transform",
        getBorderColor(),
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">{getIcon()}</div>

          <div className="flex-1 min-w-0">
            {popup.title && (
              <p className="text-sm font-semibold text-black mb-1">
                {popup.title}
              </p>
            )}
            <p className="text-sm text-gray-800">{popup.message}</p>

            {popup.action && (
              <button
                onClick={popup.action.onClick}
                className="mt-2 text-sm font-medium text-black hover:text-gray-700 underline"
              >
                {popup.action.label}
              </button>
            )}
          </div>

          <button
            onClick={handleRemove}
            className="flex-shrink-0 text-gray-600 hover:text-black transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
}
