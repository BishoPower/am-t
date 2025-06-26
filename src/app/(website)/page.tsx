"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import MagazineCarousel from "@/components/editorial/MagazineCarousel";
import PersonalizedSections from "@/components/home/PersonalizedSections";
import TrendingRecentSections from "@/components/home/TrendingRecentSections";
import Spinner from "@/components/global/loader/spinner";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

type HomeData = {
  featuredArticles: Array<{
    id: string;
    title: string;
    subtitle: string;
    image: string;
    category: string;
    slug: string;
    date: string;
  }>;
  personalizedSections?: Array<{
    title: string;
    subtitle: string;
    listings: any[];
    type: "recommended" | "viewed" | "searches";
  }>;
  trendingListings: any[];
  recentListings: any[];
  categories?: Array<{
    name: string;
    count: number;
  }>;
};

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHomeData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/home");
      if (!response.ok) {
        throw new Error("Failed to fetch home data");
      }

      const data = await response.json();
      setHomeData(data);
    } catch (err) {
      console.error("Error fetching home data:", err);
      setError("Failed to load content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchHomeData();
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  if (error || !homeData) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <TrendingUp className="h-12 w-12 mx-auto opacity-50" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">
          {error || "Failed to load content"}
        </p>
        <Button onClick={fetchHomeData} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <main>
      {/* Full Width Magazine Carousel */}
      <section className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 xl:-mx-12 2xl:-mx-16 3xl:-mx-20 4xl:-mx-[320px] mb-16">
        <MagazineCarousel articles={homeData.featuredArticles} />
      </section>

      <div className="space-y-16">
        {/* Personalized Sections (for signed-in users) */}
        {isSignedIn &&
          homeData.personalizedSections &&
          homeData.personalizedSections.length > 0 && (
            <PersonalizedSections sections={homeData.personalizedSections} />
          )}

        {/* Trending and Recent Sections */}
        <TrendingRecentSections
          trendingListings={homeData.trendingListings}
          recentListings={homeData.recentListings}
        />

        {/* Call to Action for Non-Signed In Users */}
        {!isSignedIn && (
          <section className="bg-gray-50 rounded-lg p-12 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-70" />
            <h2 className="text-2xl font-bold mb-4">Join the AM-T Community</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Sign up to get personalized recommendations, track your favorite
              items, and connect with other traders in the community.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/sign-up">
                <Button size="lg" className="font-bold">
                  Get Started
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button variant="outline" size="lg" className="border-2">
                  Explore Marketplace
                </Button>
              </Link>
            </div>
          </section>
        )}

        {/* Quick Stats */}
        {homeData.categories && homeData.categories.length > 0 && (
          <section className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-bold mb-6 text-center">
              Popular Categories
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {homeData.categories.slice(0, 8).map((category) => (
                <Link
                  key={category.name}
                  href={`/marketplace?search=${encodeURIComponent(
                    category.name
                  )}`}
                  className="bg-white px-4 py-2 rounded-full border hover:border-black transition-colors"
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="text-gray-500 ml-2">({category.count})</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
