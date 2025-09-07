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
  featured: {
    name: "FEATURED",
    description: "Essential content for new and experienced AM-T traders",
    articles: [
      {
        id: "1",
        title: "Welcome to AM-T",
        excerpt: "Your premier destination for authentic streetwear trading",
        image: "/amtlogo-static.png",
        date: "July 3, 2025",
        readTime: "3 min read",
        slug: "welcome-to-am-t",
      },
    ],
  },
  guide: {
    name: "GUIDE",
    description: "Step-by-step guides for using AM-T effectively",
    articles: [
      {
        id: "2",
        title: "Getting Started with AM-T",
        excerpt: "Everything you need to know to begin trading on AM-T",
        image: "/amtlogo-static.png",
        date: "July 3, 2025",
        readTime: "5 min read",
        slug: "getting-started-guide",
      },
    ],
  },
  tips: {
    name: "TIPS",
    description: "Pro tips and best practices for successful trading",
    articles: [
      {
        id: "3",
        title: "Building Your Trading Profile",
        excerpt: "How to create an attractive and trustworthy trader profile",
        image: "/amtlogo-static.png",
        date: "July 3, 2025",
        readTime: "4 min read",
        slug: "building-trading-profile",
      },
    ],
  },
  info: {
    name: "INFO",
    description: "Important information about policies and guidelines",
    articles: [
      {
        id: "4",
        title: "Community Guidelines",
        excerpt: "Understanding AM-T's community standards and policies",
        image: "/amtlogo-static.png",
        date: "July 3, 2025",
        readTime: "3 min read",
        slug: "community-guidelines",
      },
    ],
  },
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const categoryInfo =
    categoryData[category as keyof typeof categoryData] ||
    categoryData["featured"];

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
            <Link
              key={article.id}
              href={`/editorial/article/admin/${article.slug}`}
            >
              <Card className="border-2 hover:border-black transition-colors group cursor-pointer h-full">
                <div className="relative h-48 overflow-hidden bg-white">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
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
