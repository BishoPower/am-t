"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ChevronRight, TrendingUp, Users, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TrendingTag = {
  name: string;
  count: number;
};

type Stats = {
  activeUsers: number;
  completedTrades: number;
  tradesToday: number;
  newListingsToday: number;
  activeListings: number;
  avgItemsPerTrade: number;
};

type EditorialData = {
  trendingTags: TrendingTag[];
  stats: Stats;
};

// Mock data for articles - in a real app, this would come from an API/CMS
const featuredArticle = {
  id: "1",
  title: "The Summer of Micro Trends",
  subtitle: "How small fashion movements are reshaping the trading landscape",
  excerpt: "From Y2K revival accessories to minimalist tech wear, discover the micro trends that are dominating AM-T's trading community this season.",
  image: "/api/placeholder/800/500",
  category: "SURFACED",
  author: "AM-T Editorial",
  date: "June 25, 2025",
  readTime: "5 min read",
};

const categories = [
  { name: "STREET STYLE", count: 12, color: "bg-black" },
  { name: "MASTER CLASS", count: 8, color: "bg-gray-800" },
  { name: "THE DROP", count: 15, color: "bg-gray-600" },
  { name: "STAFF PICKS", count: 6, color: "bg-gray-700" },
  { name: "SURFACED", count: 20, color: "bg-gray-900" },
  { name: "NEWS", count: 25, color: "bg-gray-500" },
  { name: "SHOPPING", count: 18, color: "bg-gray-800" },
  { name: "INTERVIEWS", count: 10, color: "bg-black" },
  { name: "LIFESTYLE", count: 14, color: "bg-gray-700" },
];

const recentArticles = [
  {
    id: "2",
    title: "Why Hedi Slimane is Having a Moment",
    category: "MASTER CLASS",
    image: "/api/placeholder/400/300",
    date: "June 24, 2025",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "The Rise of Sustainable Trading",
    category: "NEWS",
    image: "/api/placeholder/400/300",
    date: "June 23, 2025",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Street Style: Tokyo Fashion Week",
    category: "STREET STYLE",
    image: "/api/placeholder/400/300",
    date: "June 22, 2025",
    readTime: "4 min read",
  },
  {
    id: "5",
    title: "Exclusive: Designer Interview Series",
    category: "INTERVIEWS",
    image: "/api/placeholder/400/300",
    date: "June 21, 2025",
    readTime: "12 min read",
  },
];

const trendingTopics = [
  "Vintage Denim",
  "Tech Wear", 
  "Y2K Revival",
  "Minimalism",
  "Sustainable Fashion",
  "Archive Pieces",
];

export default function EditorialPage() {
  const [editorialData, setEditorialData] = useState<EditorialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEditorialData = async () => {
      try {
        const response = await fetch('/api/editorial/stats');
        if (response.ok) {
          const data = await response.json();
          setEditorialData(data);
        }
      } catch (error) {
        console.error('Failed to fetch editorial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEditorialData();
  }, []);

  // Use real data if available, fallback to static data
  const trendingTags = editorialData?.trendingTags || 
    trendingTopics.map(name => ({ name, count: 0 }));
  
  const stats = editorialData?.stats || {
    activeUsers: 0,
    completedTrades: 0,
    tradesToday: 0,
    newListingsToday: 0,
    activeListings: 0,
    avgItemsPerTrade: 0,
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-[70vh] w-full overflow-hidden">
          <Image
            src="/api/placeholder/1400/700"
            alt={featuredArticle.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-white text-black hover:bg-gray-100 font-bold text-sm px-3 py-1">
                {featuredArticle.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {featuredArticle.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-6 max-w-3xl">
                {featuredArticle.subtitle}
              </p>
              <div className="flex items-center gap-6 text-gray-300 mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{featuredArticle.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{featuredArticle.date}</span>
                </div>
                <span className="text-sm">{featuredArticle.readTime}</span>
              </div>              <Link href="/editorial/article/summer-micro-trends">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100 font-bold"
                >
                  READ MORE
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wide">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/editorial/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-between p-3 border-2 border-gray-200 hover:border-black transition-colors group"
                  >
                    <span className="font-bold text-sm group-hover:text-black">
                      {category.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>            {/* Trending Topics */}
            <div>              <h3 className="text-lg font-bold mb-6 uppercase tracking-wide flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending
                {!isLoading && (
                  <span className="text-xs font-normal normal-case text-gray-500 ml-auto">
                    Live
                  </span>
                )}
              </h3>
              {isLoading ? (
                <div className="flex flex-wrap gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {trendingTags.slice(0, 8).map((tag) => (
                    <Badge 
                      key={tag.name}
                      variant="outline" 
                      className="hover:bg-black hover:text-white transition-colors cursor-pointer"
                      title={`${tag.count} listings`}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>            {/* Community Stats */}
            <Card className="border-2">
              <CardContent className="p-6">                <h3 className="text-lg font-bold mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community
                  {!isLoading && (
                    <span className="text-xs font-normal normal-case text-gray-500 ml-auto">
                      Live
                    </span>
                  )}
                </h3>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                          <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                        <div className="w-full bg-gray-200 h-2">
                          <div className="bg-gray-300 h-2 animate-pulse rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Active Traders</span>
                        <span className="text-sm font-bold">{stats.activeUsers.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2">
                        <div className="bg-black h-2 w-[68%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Trades Today</span>
                        <span className="text-sm font-bold">{stats.tradesToday}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2">
                        <div className="bg-black h-2 w-[35%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">New Listings</span>
                        <span className="text-sm font-bold">{stats.newListingsToday}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2">
                        <div className="bg-black h-2 w-[52%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Total Trades</span>
                        <span className="text-sm font-bold">{stats.completedTrades.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2">
                        <div className="bg-black h-2 w-[75%]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold uppercase tracking-wide">Latest Articles</h2>
              <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white">
                View All
              </Button>
            </div>            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentArticles.map((article) => (
                <Link key={article.id} href={`/editorial/article/${article.id === "2" ? "hedi-slimane-moment" : article.id === "3" ? "sustainable-trading-rise" : article.id === "4" ? "tokyo-fashion-week-street-style" : "exclusive-designer-interview"}`}>
                  <Card className="border-2 hover:border-black transition-colors group cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-white text-black hover:bg-gray-100 font-bold">
                        {article.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}}
            </div>

            {/* Newsletter Signup */}
            <Card className="mt-12 border-2 bg-gray-50">
              <CardContent className="p-8 text-center">
                <Zap className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Get the latest trends, trading tips, and exclusive content delivered to your inbox.
                </p>
                <div className="flex gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 focus:border-black outline-none"
                  />
                  <Button className="bg-black hover:bg-gray-800 font-bold px-8">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
