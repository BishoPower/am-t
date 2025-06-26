"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Filter, Grid, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data for category articles
const categoryData = {
  surfaced: {
    name: "SURFACED",
    description: "Emerging trends and movements in the fashion trading world",
    articles: [
      {
        id: "1",
        title: "The Summer of Micro Trends",
        excerpt:
          "How small fashion movements are reshaping the trading landscape",
        image: "/api/placeholder/400/300",
        date: "June 25, 2025",
        readTime: "5 min read",
        slug: "summer-micro-trends",
      },
      {
        id: "2",
        title: "Archive Fashion Goes Mainstream",
        excerpt:
          "The rise of vintage and archive pieces in contemporary trading",
        image: "/api/placeholder/400/300",
        date: "June 20, 2025",
        readTime: "7 min read",
        slug: "archive-fashion-mainstream",
      },
      {
        id: "3",
        title: "The New Collectors: Gen Z Trading Habits",
        excerpt:
          "Understanding how the youngest generation approaches fashion trading",
        image: "/api/placeholder/400/300",
        date: "June 15, 2025",
        readTime: "6 min read",
        slug: "gen-z-trading-habits",
      },
    ],
  },
  "street-style": {
    name: "STREET STYLE",
    description: "Real fashion from real people on the streets",
    articles: [
      {
        id: "4",
        title: "Tokyo Fashion Week Street Style",
        excerpt: "The best looks from the streets of Harajuku and Shibuya",
        image: "/api/placeholder/400/300",
        date: "June 22, 2025",
        readTime: "4 min read",
        slug: "tokyo-fashion-week-street-style",
      },
      {
        id: "5",
        title: "New York's Underground Fashion Scene",
        excerpt: "Discovering unique style in the city's hidden corners",
        image: "/api/placeholder/400/300",
        date: "June 18, 2025",
        readTime: "8 min read",
        slug: "ny-underground-fashion",
      },
    ],
  },
  "master-class": {
    name: "MASTER CLASS",
    description: "In-depth analysis and expert insights",
    articles: [
      {
        id: "6",
        title: "Why Hedi Slimane is Having a Moment",
        excerpt: "An analysis of the designer's current cultural influence",
        image: "/api/placeholder/400/300",
        date: "June 24, 2025",
        readTime: "8 min read",
        slug: "hedi-slimane-moment",
      },
      {
        id: "7",
        title: "The Economics of Hypebeast Culture",
        excerpt: "Understanding the financial forces behind streetwear trading",
        image: "/api/placeholder/400/300",
        date: "June 19, 2025",
        readTime: "12 min read",
        slug: "economics-hypebeast-culture",
      },
    ],
  },
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const categoryInfo = categoryData[category] || categoryData["surfaced"];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/editorial"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-gray-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Editorial
          </Link>
        </div>
      </div>

      {/* Category Header */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <Badge className="mb-4 bg-black text-white font-bold text-lg px-4 py-2">
            {categoryInfo.name}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl">
            {categoryInfo.description}
          </p>

          {/* Filters and View Options */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-2">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <span className="text-sm text-gray-600">
                {categoryInfo.articles.length} articles
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-2">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-2">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryInfo.articles.map((article) => (
            <Link key={article.id} href={`/editorial/article/${article.slug}`}>
              <Card className="border-2 hover:border-black transition-colors group cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-white text-black font-bold">
                    {categoryInfo.name}
                  </Badge>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-1">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-black hover:bg-black hover:text-white font-bold"
          >
            Load More Articles
          </Button>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Story</h2>
          <p className="text-gray-600 mb-8">
            Get the latest {categoryInfo.name.toLowerCase()} content delivered
            to your inbox.
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
        </div>
      </div>
    </div>
  );
}
