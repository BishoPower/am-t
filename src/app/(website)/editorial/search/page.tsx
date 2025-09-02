"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronLeft, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Mock search results
const searchResults = [
  {
    id: "1",
    title: "Welcome to AM-T",
    excerpt: "Your premier destination for authentic streetwear trading",
    image: "/amtlogo-static.png",
    category: "FEATURED",
    date: "July 3, 2025",
    readTime: "3 min read",
    slug: "welcome-to-am-t",
  },
  {
    id: "2",
    title: "Getting Started with AM-T",
    excerpt: "Everything you need to know to begin trading on AM-T",
    image: "/amtlogo-static.png",
    category: "GUIDE",
    date: "July 3, 2025",
    readTime: "5 min read",
    slug: "getting-started-guide",
  },
  {
    id: "3",
    title: "Building Your Trading Profile",
    excerpt: "How to create an attractive and trustworthy trader profile",
    image: "/amtlogo-static.png",
    category: "TIPS",
    date: "July 3, 2025",
    readTime: "4 min read",
    slug: "building-trading-profile",
  },
];

export default function EditorialSearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(query);

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

      {/* Search Header */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Search Articles
          </h1>

          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for articles, trends, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 focus:border-black outline-none text-lg"
                />
              </div>
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 font-bold px-8"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Search Results Info */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              {query && (
                <p className="text-gray-600">
                  Showing results for{" "}
                  <span className="font-bold">"{query}"</span>
                </p>
              )}
              <p className="text-sm text-gray-500">
                {searchResults.length} articles found
              </p>
            </div>
            <Button variant="outline" className="border-2">
              <Filter className="h-4 w-4 mr-2" />
              Filter Results
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div className="space-y-8">
            {searchResults.map((article) => (
              <Link
                key={article.id}
                href={`/editorial/article/admin/${article.slug}`}
              >
                <Card className="border-2 hover:border-black transition-colors group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      <div className="relative h-48 md:h-auto overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-white text-black font-bold">
                          {article.category}
                        </Badge>
                      </div>
                      <div className="md:col-span-2 p-6 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-lg">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-2xl font-bold mb-2">No articles found</h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your search terms or browse our categories
            </p>
            <Link href="/editorial">
              <Button
                variant="outline"
                className="border-2 border-black hover:bg-black hover:text-white"
              >
                Browse All Articles
              </Button>
            </Link>
          </div>
        )}

        {/* Popular Search Terms */}
        <div className="mt-16 pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold mb-4">Popular Search Terms</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Streetwear",
              "Vintage",
              "Trading Tips",
              "Fashion Trends",
              "Designer Analysis",
              "Sustainability",
            ].map((term) => (
              <Badge
                key={term}
                variant="outline"
                className="hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
