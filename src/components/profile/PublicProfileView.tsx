import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import ListingCard from "@/components/listing/ListingCard";

type PublicProfileProps = {
  user: any; // Type this properly based on your actual user structure
  listings: any[]; // Type this properly based on your actual listing structure
};

const PublicProfileView = ({ user, listings }: PublicProfileProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Public Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="relative h-24 w-24 rounded-full overflow-hidden">
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.username || "User"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">
                {user.username?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-600">
            Member since {formatDate(user.createdAt)}
          </p>

          {/* Public profile stats */}
          <div className="mt-3 flex gap-4">
            <div>
              <span className="font-medium">{listings.length}</span> listings
            </div>
          </div>
        </div>
      </div>

      {/* Public Closet Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {user.closet?.name || "Closet"}
        </h2>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No public listings available.</p>
        )}
      </div>
    </div>
  );
};

export default PublicProfileView;
