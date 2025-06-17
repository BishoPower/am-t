import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date into a readable string
 */
export function formatDate(date: Date | string): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  // Format: "January 1, 2023"
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a message timestamp for chat display
 */
export function formatMessageTime(date: Date | string): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - d.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  // For older messages, show the actual date
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

/**
 * Format a chat message timestamp with more detailed time display
 */
export function formatChatTime(date: Date | string): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - d.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;

  // For older messages, show the date
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

/**
 * Format a price with currency symbol
 */
export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

/**
 * Truncate a string to a specific length and append ellipsis
 */
export function truncate(str: string, length: number): string {
  if (!str) return "";
  if (str.length <= length) return str;

  return `${str.slice(0, length).trim()}...`;
}

/**
 * Get the profile image URL with Clerk fallback
 * @param userImage - Image from database
 * @param clerkUser - Clerk user object (serializable)
 * @returns Image URL or null if no image available
 */
export function getProfileImageUrl(
  userImage?: string | null,
  clerkUser?: { imageUrl?: string } | null
): string | null {
  // First priority: user's uploaded image from database
  if (userImage) {
    return userImage;
  }

  // Second priority: Clerk's profile image
  if (clerkUser?.imageUrl) {
    return clerkUser.imageUrl;
  }

  // No image available
  return null;
}
