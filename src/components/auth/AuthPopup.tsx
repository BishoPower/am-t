"use client";

import React, { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import { X } from "lucide-react";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "signin" | "signup";
  onModeChange: (mode: "signin" | "signup") => void;
}

export const AuthPopup: React.FC<AuthPopupProps> = ({
  isOpen,
  onClose,
  mode,
  onModeChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}{" "}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-12 right-6 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          {/* Content */}
          <div className="px-8 py-10 text-center">
            {" "}
            {mode === "signin" ? (
              <div>
                {" "}
                <SignIn
                  routing="virtual"
                  signUpUrl="#"
                  redirectUrl="/auth/callback"
                  afterSignInUrl="/auth/callback"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-0 w-full p-0 bg-transparent",
                      main: "p-0",
                      headerTitle:
                        "text-2xl font-bold text-gray-900 mb-2 text-center",
                      headerSubtitle:
                        "text-gray-600 text-base mb-8 font-normal text-center",
                      socialButtonsBlockButton:
                        "w-full border border-gray-300 hover:border-gray-400 transition-colors font-medium py-3 px-4 rounded-lg mb-3 bg-white hover:bg-gray-50 text-center",
                      socialButtonsBlockButtonText: "font-medium text-gray-700",
                      socialButtonsBlockButtonArrowIcon: "text-gray-500",
                      dividerLine: "bg-gray-300",
                      dividerText: "text-gray-500 font-medium bg-white px-4",
                      formFieldInput:
                        "w-full border border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500",
                      formButtonPrimary:
                        "w-full bg-black hover:bg-gray-800 transition-colors font-medium py-3 px-4 rounded-lg text-white",
                      footerActionLink:
                        "text-gray-900 hover:text-gray-600 font-medium underline",
                      identityPreviewEditButton:
                        "text-gray-900 hover:text-gray-600",
                      formFieldLabel: "font-medium text-gray-700 mb-2 pl-4",
                      alertText: "text-red-600 text-sm",
                      formFieldWarningText: "text-red-600 text-sm",
                      footer: "hidden",
                      formContainer: "p-0",
                      formFieldRow: "mb-4",
                    },
                    layout: {
                      socialButtonsPlacement: "top",
                    },
                  }}
                />
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => onModeChange("signup")}
                      className="font-medium text-gray-900 hover:text-gray-600 underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {" "}
                <SignUp
                  routing="virtual"
                  signInUrl="#"
                  redirectUrl="/auth/callback"
                  afterSignUpUrl="/auth/callback"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-0 w-full p-0 bg-transparent",
                      main: "p-0",
                      headerTitle:
                        "text-2xl font-bold text-gray-900 mb-2 text-center",
                      headerSubtitle:
                        "text-gray-600 text-base mb-8 font-normal text-center",
                      socialButtonsBlockButton:
                        "w-full border border-gray-300 hover:border-gray-400 transition-colors font-medium py-3 px-4 rounded-lg mb-3 bg-white hover:bg-gray-50 text-center",
                      socialButtonsBlockButtonText: "font-medium text-gray-700",
                      socialButtonsBlockButtonArrowIcon: "text-gray-500",
                      dividerLine: "bg-gray-300",
                      dividerText: "text-gray-500 font-medium bg-white px-4",
                      formFieldInput:
                        "w-full border border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500",
                      formButtonPrimary:
                        "w-full bg-black hover:bg-gray-800 transition-colors font-medium py-3 px-4 rounded-lg text-white",
                      footerActionLink:
                        "text-gray-900 hover:text-gray-600 font-medium underline",
                      identityPreviewEditButton:
                        "text-gray-900 hover:text-gray-600",
                      formFieldLabel: "font-medium text-gray-700 mb-2 pl-4",
                      alertText: "text-red-600 text-sm",
                      formFieldWarningText: "text-red-600 text-sm",
                      footer: "hidden",
                      formContainer: "p-0",
                      formFieldRow: "mb-4",
                    },
                    layout: {
                      socialButtonsPlacement: "top",
                    },
                  }}
                />
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <button
                      onClick={() => onModeChange("signin")}
                      className="font-medium text-gray-900 hover:text-gray-600 underline"
                    >
                      Log in
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
