"use client";

import * as React from "react";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { NavLink } from "./NavLink";
import {
  Menu,
  Search,
  X,
  User,
  ShoppingBag,
  Heart,
  MessageSquare,
  Bell,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { getProfileImageUrl } from "@/lib/utils";
import { AuthPopup } from "@/components/auth/AuthPopup";
import { useAuthPopup } from "@/hooks/use-auth-popup";

// Separate main nav links from authentication links
const mainNavLinks = [
  {
    label: "Trade",
    variant: "outline" as const,
    className: "border-black hover:bg-black hover:text-white transition-colors",
    borderWidth: "border-2",
    href: "/trade",
  },
  {
    label: "Listings",
    variant: "default" as const,
    className: "hover:text-primary/80 transition-colors",
    href: "/marketplace",
  },
  {
    label: "Read",
    variant: "default" as const,
    className: "hover:text-primary/80 transition-colors",
    href: "/editorial",
  },
];

const authLinks = [
  {
    label: "Login",
    variant: "outline" as const,
    onClick: "signin" as const,
    className: "border-gray-300 hover:border-black transition-colors",
  },
  {
    label: "Sign up",
    variant: "solid" as const,
    onClick: "signup" as const,
    className: "hover:bg-black/80 transition-colors",
  },
];

const categoryLinks = [
  { label: "DESIGNERS", href: "/designers" },
  { label: "MENSWEAR", href: "/menswear" },
  { label: "WOMENSWEAR", href: "/womenswear" },
  { label: "SNEAKERS", href: "/sneakers" },
  { label: "STAFF PICKS", href: "/staff-picks" },
  { label: "COLLECTIONS", href: "/collections" },
  { label: "EDITORIAL", href: "/editorial" },
];

export const NavigationBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  // Set authLoading to true by default
  const [authLoading, setAuthLoading] = useState(true);
  const [userData, setUserData] = useState<{
    image?: string;
    username?: string;
  }>({});
  const menuRef = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, userId, signOut } = useAuth();
  const { user, isLoaded: clerkLoaded } = useUser();
  const authPopup = useAuthPopup();

  // Update your useEffect to consider Clerk's loading state
  useEffect(() => {
    async function fetchUserData() {
      // Wait for Clerk to load before determining auth state
      if (!clerkLoaded) {
        return;
      }

      // Set a minimum loading time (e.g., 500ms) to prevent flashing
      const startTime = Date.now();

      if (!isSignedIn || !userId) {
        const elapsed = Date.now() - startTime;
        const remainingDelay = Math.max(0, 500 - elapsed);

        // Ensure loading shows for at least 500ms
        if (remainingDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingDelay));
        }

        setAuthLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/profile?clerkId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData({
            image: data.image,
            username: data.username,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        const elapsed = Date.now() - startTime;
        const remainingDelay = Math.max(0, 500 - elapsed);

        // Ensure loading shows for at least 500ms
        if (remainingDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingDelay));
        }

        setAuthLoading(false);
      }
    }

    fetchUserData();
  }, [isSignedIn, userId, clerkLoaded]);

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    setSearchOpen(false);
  };

  // Close dropdown menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuOpen
      ) {
        setMenuOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        searchOpen
      ) {
        setSearchOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        profileOpen
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, searchOpen, profileOpen]);

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Add a function to handle signing out
  const handleSignOut = () => {
    signOut();
    setProfileOpen(false);
  };
  // Custom profile button component
  const ProfileButton = () => {
    // Get the profile image URL with Clerk fallback
    const profileImageUrl = getProfileImageUrl(userData.image, user);

    return (
      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center justify-center rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full object-cover w-8 h-8"
              onError={(e) => {
                // Fallback to default avatar if image fails to load
                (e.target as HTMLImageElement).src = "/default-avatar.png";
              }}
            />
          ) : (
            <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-500" />
            </div>
          )}
        </button>

        {/* Profile dropdown menu */}
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">
                @{userData.username || user?.username}
              </p>
            </div>{" "}
            <Link
              href={`/profile/${userData.username || user?.username}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setProfileOpen(false)}
            >
              My Profile
            </Link>{" "}
            <Link
              href={`/settings/${userData.username || user?.username}`}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setProfileOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {" "}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 py-2">
        <div className="w-full px-8 md:px-16 lg:px-24 flex justify-center">
          <div className="w-full max-w-[1400px]">
            {/* Main navigation row */}
            <div className="flex items-center justify-between">
              {/* Left side: Hamburger menu on mobile, Logo on desktop */}
              <div className="flex items-center">
                {/* Hamburger button (mobile only) */}
                <button
                  className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors lg:hidden"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-expanded={menuOpen}
                  aria-label="Toggle navigation menu"
                >
                  {menuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
                {/* Search icon button (mobile only) */}
                <button
                  className="flex items-center justify-center p-2 ml-1 rounded-md hover:bg-gray-100 transition-colors lg:hidden"
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-expanded={searchOpen}
                  aria-label="Toggle search"
                >
                  <Search className="h-5 w-5" />
                </button>{" "}
                {/* Desktop logo */}
                <Link href="/" className="hidden lg:block flex-shrink-0 mr-4">
                  <Logo src="/amtlogo.gif?v=1" alt="AM-T Logo" />
                </Link>
              </div>

              {/* Center: Logo on mobile, flexible Search on desktop */}
              <div className="flex justify-center items-center">
                {" "}
                {/* Mobile logo - Centered */}
                <div className="lg:hidden">
                  <Link href="/">
                    <Logo src="/amtlogo.gif?v=1" alt="AM-T Logo" />
                  </Link>
                </div>
              </div>

              {/* Desktop Search Bar - Flexible width */}
              <div className="hidden lg:flex flex-grow mx-2 lg:mx-3 max-w-6xl">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Right side: Auth buttons or User menu */}
              <div className="flex items-center relative">
                {authLoading ? (
                  /* Loading state - more consistent with your logged-in state */
                  <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
                    {/* Placeholder for icon buttons */}
                    <div className="p-2 rounded-full bg-gray-100 w-9 h-9 animate-pulse"></div>
                    <div className="p-2 rounded-full bg-gray-100 w-9 h-9 animate-pulse"></div>
                    <div className="p-2 rounded-full bg-gray-100 w-9 h-9 animate-pulse"></div>
                    {/* Placeholder for profile button */}
                    <div className="rounded-full bg-gray-200 w-8 h-8 animate-pulse"></div>
                  </div>
                ) : isSignedIn /* Authenticated user UI */ ? (
                  <div className="flex items-center space-x-1 sm:space-x-1 md:space-x-2">
                    {/* Icon buttons */}
                    <Link
                      href="/favorites"
                      className="p-2 hover:bg-gray-100 rounded-full flex items-center justify-center"
                      aria-label="Favorites"
                    >
                      <Heart className="h-5 w-5" />
                    </Link>
                    <Link
                      href="/messages"
                      className="p-2 hover:bg-gray-100 rounded-full flex items-center justify-center"
                      aria-label="Messages"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </Link>{" "}
                    <Link
                      href={`/profile/${userData.username || user?.username}`}
                      className="p-2 hover:bg-gray-100 rounded-full flex items-center justify-center"
                      aria-label="My Profile"
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </Link>
                    {/* Profile Button */}
                    <ProfileButton />
                  </div>
                ) : (
                  /* Non-authenticated user UI */
                  <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-3">
                    {authLinks.map((link, index) => (
                      <NavLink
                        key={index}
                        {...link}
                        onClick={
                          link.onClick === "signin"
                            ? authPopup.openSignIn
                            : authPopup.openSignUp
                        }
                        className={`${
                          link.className || ""
                        } px-3 py-1.5 text-xs sm:text-sm whitespace-nowrap`}
                      />
                    ))}
                  </div>
                )}{" "}
                {/* Desktop Navigation Links - Main nav links - always visible */}
                <div className="hidden lg:flex items-center ml-2 xl:ml-3 space-x-2 xl:space-x-3">
                  {mainNavLinks.map((link, index) => (
                    <NavLink
                      key={index}
                      {...link}
                      className={`${
                        link.className || ""
                      } px-3 py-2 text-sm xl:text-base whitespace-nowrap`}
                      href={link.href}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile search overlay - shown when search is clicked */}
            {searchOpen && (
              <div
                ref={searchRef}
                className="lg:hidden absolute left-0 right-0 top-full mt-1 px-4 py-3 bg-white shadow-md rounded-md z-30"
              >
                <div className="w-full max-w-md mx-auto">
                  <SearchBar onSearch={handleSearch} />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>{" "}
      {/* Secondary Navigation (Categories) - Desktop only */}
      <div className="hidden lg:block bg-white border-b border-gray-100 py-3 sticky top-[61px] z-40">
        <div className="w-full px-8 md:px-16 lg:px-24 flex justify-center">
          <div className="w-full max-w-[1400px]">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-between w-full max-w-5xl">
                {categoryLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-xs font-bold hover:text-gray-600 transition-colors uppercase tracking-wide"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Overlay when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      ></div>
      {/* Sidebar Navigation - Animated from left */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg">Menu</h2>
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="p-4 overflow-y-auto h-full">
          {authLoading ? (
            <div className="flex items-center justify-center p-4">
              <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : isSignedIn ? (
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4 px-2">
                {/* Replace UserButton with custom profile image */}
                {getProfileImageUrl(userData.image, user) ? (
                  <Image
                    src={getProfileImageUrl(userData.image, user)!}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                )}{" "}
                <Link
                  href={`/settings/${userData.username || user?.username}`}
                  className="font-medium"
                >
                  My Settings
                </Link>
              </div>

              <div className="flex flex-col space-y-3 mb-6 px-2">
                {" "}
                <Link
                  href={`/profile/${userData.username || user?.username}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/messages"
                  className="flex items-center space-x-2 text-sm"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Messages</span>
                </Link>
                <Link
                  href="/favorites"
                  className="flex items-center space-x-2 text-sm"
                >
                  <Heart className="h-4 w-4" />
                  <span>Favorites</span>
                </Link>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
            </div>
          ) : (
            <>
              <div className="w-full flex flex-col space-y-2 mb-4">
                {authLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (link.onClick === "signin") {
                        authPopup.openSignIn();
                      } else {
                        authPopup.openSignUp();
                      }
                      setMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-center text-sm font-medium ${
                      link.variant === "solid"
                        ? "bg-black text-white"
                        : "border border-gray-300 text-black"
                    } rounded-md`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-200 w-full my-2"></div>
            </>
          )}

          {/* Main nav links */}
          <div className="w-full flex flex-col space-y-2 mb-4">
            {mainNavLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href || "#"}
                className="w-full px-2 py-2 text-base font-medium text-left hover:text-gray-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-200 w-full my-2"></div>

          <h3 className="font-bold px-2 pb-1">Categories</h3>
          <div className="flex flex-col w-full">
            {categoryLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="w-full px-2 py-2 text-sm font-medium text-left hover:text-gray-600 transition-colors block"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}{" "}
          </div>
        </div>
      </div>
      {/* Auth Popup */}
      <AuthPopup
        isOpen={authPopup.isOpen}
        onClose={authPopup.close}
        mode={authPopup.mode}
        onModeChange={authPopup.switchMode}
      />
    </>
  );
};
