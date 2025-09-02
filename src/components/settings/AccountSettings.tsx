import React, { useState, useEffect } from "react";
import { useSettings } from "./SettingsProvider";
import { useRouter } from "next/navigation";
import { usePopup } from "@/components/ui/popup";
import { createPopupUtils } from "@/lib/popup";
import { useAuth, useUser } from "@clerk/nextjs";
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
  const { userData, isLoading, error, refetch } = useSettings();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const { showPopup } = usePopup();
  const popup = createPopupUtils(showPopup);
  const [showChangeEmailForm, setShowChangeEmailForm] = useState(false);
  const [newEmail, setNewEmail] = useState<string | null>(null);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<
    string | null
  >(null);
  const { showConfirmation } = useConfirmation();
  const { isLoaded, isSignedIn } = useAuth();
  const { user: userObject } = useUser();
  const confirmation = createConfirmationUtils(showConfirmation);

  // Check for verification status on component mount and when user data changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const verified = urlParams.get("verified");
    const error = urlParams.get("error");

    // Also check for Clerk's verification parameters
    const clerkVerified = urlParams.get("__clerk_status") === "verified";

    if (verified === "true" || clerkVerified) {
      // Handle successful verification and cleanup
      const handleVerificationSuccess = async () => {
        if (userObject) {
          try {
            await userObject.reload();

            // Find non-primary emails that are verified
            const verifiedNonPrimaryEmails = userObject.emailAddresses.filter(
              (email) =>
                email.id !== userObject.primaryEmailAddress?.id &&
                email.verification?.status === "verified"
            );

            if (verifiedNonPrimaryEmails.length > 0) {
              const newEmailAddress = verifiedNonPrimaryEmails[0];

              // Set new email as primary
              await userObject.update({
                primaryEmailAddressId: newEmailAddress.id,
              });

              // Update our database to match
              await fetch("/api/user/email", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: newEmailAddress.emailAddress }),
              });

              // Delete all other email addresses (following Clerk best practices)
              const emailsToDelete = userObject.emailAddresses.filter(
                (email) => email.id !== newEmailAddress.id
              );

              for (const email of emailsToDelete) {
                try {
                  await email.destroy();
                } catch (deleteErr) {
                  // Silently handle deletion errors
                }
              }

              popup.success(
                "Email verified and updated successfully! Old email removed."
              );
            } else {
              popup.success("Email verified successfully!");
            }
          } catch (error) {
            popup.success("Email verified successfully!");
          }
        } else {
          popup.success("Email verified successfully!");
        }

        setPendingVerificationEmail(null);
        // Clean up URL
        window.history.replaceState({}, "", window.location.pathname);
        // Refresh data
        try {
          (refetch as unknown as () => void)?.();
        } catch (e) {
          // ignore
        }
      };

      handleVerificationSuccess();
    } else if (error) {
      let errorMessage = "Email verification failed.";
      switch (error) {
        case "invalid-link":
          errorMessage = "Invalid verification link.";
          break;
        case "invalid-token":
          errorMessage = "Verification link has expired or is invalid.";
          break;
        case "user-not-found":
          errorMessage = "User not found.";
          break;
        case "verification-failed":
          errorMessage = "Email verification failed. Please try again.";
          break;
      }
      popup.error(errorMessage);
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [popup, refetch, userObject]);

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

  const handleStartChangeEmail = () => {
    setNewEmail(userData?.email || userEmail || "");
    setShowChangeEmailForm(true);
  };

  const handleCancelChangeEmail = () => {
    setShowChangeEmailForm(false);
    setNewEmail(null);
    setPendingVerificationEmail(null);
  };

  const handleSaveEmail = async () => {
    if (!newEmail) return popup.error("Please enter a valid email address.");

    // Check authentication state first
    if (!isLoaded) {
      return popup.error("Authentication is still loading. Please wait.");
    }

    if (!isSignedIn) {
      return popup.error(
        "You are not signed in. Please sign in and try again."
      );
    }

    if (!userObject) {
      return popup.error(
        "User data not available. Please refresh and try again."
      );
    }

    setIsChangingEmail(true);
    popup.info("Updating email...");
    try {
      // First update our database
      const res = await fetch("/api/user/email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });

      if (res.ok) {
        const result = await res.json();

        // If we got a nextStep action to update Clerk
        if (result.nextStep?.action === "updateClerkEmail") {
          popup.info(
            "Database updated. Now updating authentication provider..."
          );

          try {
            // Create new email address in Clerk (but don't set as primary yet)
            const newEmailAddress = await userObject.createEmailAddress({
              email: newEmail,
            });

            // Use Clerk's native email_link verification (requires dashboard configuration)
            await newEmailAddress.prepareVerification({
              strategy: "email_link",
              redirectUrl: `${window.location.origin}/settings`,
            });

            // Store pending email for tracking
            setPendingVerificationEmail(newEmail);
            setShowChangeEmailForm(false);

            popup.success(
              `Verification link sent to ${newEmail}! Please check your email and click the verification link.`
            );
          } catch (clerkErr: any) {
            popup.error(
              "Failed to set up email verification. Please try again."
            );
          }
        } else {
          popup.success("Email updated successfully");
          setShowChangeEmailForm(false);
          setNewEmail(null);
        }

        // Refresh settings provider data if available
        try {
          (refetch as unknown as () => void)?.();
        } catch (e) {
          // ignore
        }
      } else {
        // Try to parse a JSON error body, fallback to plain text
        let errBody: any = null;
        try {
          errBody = await res.json();
        } catch (parseErr) {
          try {
            const text = await res.text();
            errBody = { error: text };
          } catch (e) {
            errBody = { error: null };
          }
        }
        const message =
          errBody?.error ||
          errBody?.details ||
          errBody?.message ||
          "Failed to update email";
        popup.error(message);
      }
    } catch (error) {
      popup.error("An error occurred while updating your email.");
    } finally {
      setIsChangingEmail(false);
    }
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
          {!showChangeEmailForm && !pendingVerificationEmail ? (
            <>
              <input
                type="email"
                readOnly
                value={userData?.email || userEmail || ""}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-white/80 text-gray-800 sm:text-sm"
                placeholder={userData?.email || userEmail || "your@email.com"}
              />
              <div className="mt-2">
                <button
                  onClick={handleStartChangeEmail}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Change Email
                </button>
              </div>
            </>
          ) : showChangeEmailForm ? (
            <div className="mt-2 flex items-center gap-2 w-full">
              <input
                type="email"
                value={newEmail ?? ""}
                onChange={(e) => setNewEmail(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              />
              <button
                onClick={handleSaveEmail}
                disabled={isChangingEmail}
                className="bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isChangingEmail ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancelChangeEmail}
                className="px-3 py-1 rounded-md border"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mt-2">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  Verification Email Sent
                </h4>
                <p className="text-sm text-blue-800 mb-3">
                  We've sent a verification link to{" "}
                  <strong>{pendingVerificationEmail}</strong>. Please check your
                  email and click the verification link to complete the email
                  change.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPendingVerificationEmail(null)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Try a different email
                  </button>
                  <span className="text-gray-400">•</span>
                  <button
                    onClick={handleCancelChangeEmail}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
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
