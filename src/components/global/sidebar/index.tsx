"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Home,
  Package,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  ShoppingBag,
  Repeat,
} from "lucide-react";
import Image from "next/image";

type Props = {
  actionUsername?: string;
  userImage?: string;
};

const Sidebar = ({ actionUsername, userImage }: Props) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.includes(path)
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      : "text-sidebar-foreground hover:bg-sidebar/80 hover:text-sidebar-foreground/80";
  };

  return (
    <aside className="h-screen sticky top-0 w-64 border-r border-sidebar-border bg-sidebar flex flex-col shadow-sm">
      {/* Profile Section */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-sidebar-accent/20">
            {userImage ? (
              <Image
                src={userImage}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-sidebar-accent/10">
                <User className="h-6 w-6 text-sidebar-foreground" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-sidebar-foreground">
              {actionUsername || "User"}
            </h3>{" "}
            <Link
              href={`/settings/${actionUsername}`}
              className="text-xs text-sidebar-foreground/70 hover:text-sidebar-accent-foreground transition-colors"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5">
        <Link
          href={`/settings/${actionUsername}`}
          className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive(
            "/settings"
          )}`}
        >
          <Home className="h-5 w-5" />
          <span>Settings</span>
        </Link>{" "}
        <Link
          href={`/settings/${actionUsername}/closet`}
          className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive(
            "/closet"
          )}`}
        >
          <Package className="h-5 w-5" />
          <span>My Closet</span>
        </Link>
        <Link
          href={`/settings/${actionUsername}/listings`}
          className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive(
            "/listings"
          )}`}
        >
          <ShoppingBag className="h-5 w-5" />
          <span>Listings</span>
        </Link>{" "}
        <Link
          href={`/settings/${actionUsername}/favorites`}
          className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive(
            "/favorites"
          )}`}
        >
          <Heart className="h-5 w-5" />
          <span>Favorites</span>
        </Link>
        <Link
          href={`/settings/${actionUsername}/trades`}
          className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive(
            "/trades"
          )}`}
        >
          <Repeat className="h-5 w-5" />
          <span>Trades</span>
        </Link>
        <Link
          href={`/settings/${actionUsername}/messages`}
          className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${isActive(
            "/messages"
          )}`}
        >
          <MessageSquare className="h-5 w-5" />
          <span>Messages</span>
        </Link>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-sidebar-border">
        <Link
          href={`/settings/${actionUsername}/settings`}
          className="flex items-center space-x-3 p-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>

        <Link
          href="/auth/sign-out"
          className="flex items-center space-x-3 p-2 rounded-md text-sidebar-foreground/80 hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
