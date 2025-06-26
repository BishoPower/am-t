"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Heart, 
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock article data - in a real app, this would be fetched based on the slug
const article = {
  id: "1",
  slug: "summer-micro-trends",
  title: "The Summer of Micro Trends",
  subtitle: "How small fashion movements are reshaping the trading landscape",
  content: `
    <p>The fashion world has always been cyclical, but in recent years, we've witnessed the rise of something entirely different: micro trends. These are not the sweeping, season-defining movements we're accustomed to, but rather small, niche aesthetic shifts that capture the imagination of specific communities.</p>
    
    <p>On AM-T, we've been tracking these micro trends closely, and what we've found is fascinating. From Y2K revival accessories to minimalist tech wear, these movements are reshaping how people trade, collect, and express themselves through fashion.</p>
    
    <h2>The Speed of Change</h2>
    
    <p>Unlike traditional fashion cycles that might last several seasons, micro trends can emerge, peak, and evolve within a matter of weeks. This acceleration is largely driven by social media platforms and the interconnected nature of online communities.</p>
    
    <p>Take, for example, the recent surge in "gorpcore" items on our platform. What started as a small movement celebrating outdoor utility wear has quickly evolved into one of our most traded categories, with vintage Patagonia pieces and technical garments seeing unprecedented demand.</p>
    
    <h2>The Trading Impact</h2>
    
    <p>These micro trends are having a profound impact on the trading landscape. Savvy traders are learning to identify emerging movements early, positioning themselves to capitalize on sudden spikes in demand for specific items or aesthetics.</p>
    
    <p>We've seen this play out repeatedly: a previously overlooked vintage band tee suddenly becomes highly sought after, or a specific silhouette of jeans experiences a revival that sends prices soaring.</p>
    
    <h2>Community-Driven Discovery</h2>
    
    <p>What makes micro trends particularly interesting is their grassroots nature. Unlike top-down fashion movements driven by major brands or fashion weeks, these trends often emerge from within communities themselves.</p>
    
    <p>On AM-T, we've witnessed entire subcommunities form around specific aesthetics or item categories. These groups become tastemakers, driving demand and setting the tone for what's considered desirable.</p>
    
    <h2>Looking Forward</h2>
    
    <p>As we move deeper into the digital age, we expect micro trends to become even more prevalent and influential. The key for both traders and fashion enthusiasts is to stay connected to these communities and remain open to unexpected movements.</p>
    
    <p>The future of fashion isn't just about what major brands decide to produce—it's about the organic movements that emerge from passionate communities of traders, collectors, and style enthusiasts.</p>
  `,
  image: "/api/placeholder/1200/600",
  category: "SURFACED",
  author: {
    name: "AM-T Editorial",
    avatar: "/api/placeholder/50/50",
    bio: "The AM-T Editorial team brings you the latest insights and trends from the trading community."
  },
  date: "June 25, 2025",
  readTime: "5 min read",
  tags: ["Trends", "Trading", "Fashion", "Community"],
  likes: 127,
  comments: 23,
  shares: 45
};

const relatedArticles = [
  {
    id: "2",
    title: "Why Hedi Slimane is Having a Moment",
    category: "MASTER CLASS",
    image: "/api/placeholder/300/200",
    slug: "hedi-slimane-moment"
  },
  {
    id: "3",
    title: "The Rise of Sustainable Trading",
    category: "NEWS",
    image: "/api/placeholder/300/200",
    slug: "sustainable-trading-rise"
  },
  {
    id: "4",
    title: "Street Style: Tokyo Fashion Week",
    category: "STREET STYLE",
    image: "/api/placeholder/300/200",
    slug: "tokyo-fashion-week-street-style"
  }
];

export default function ArticlePage() {
  const params = useParams();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="border-b-2 border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link 
            href="/editorial"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-gray-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Editorial
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Badge className="mb-4 bg-black text-white font-bold">
            {article.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {article.subtitle}
          </p>
          
          {/* Article Meta */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b-2 border-gray-200">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm">{article.author.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Actions */}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="border-2">
                <Heart className="h-4 w-4 mr-1" />
                {article.likes}
              </Button>
              <Button variant="outline" size="sm" className="border-2">
                <MessageCircle className="h-4 w-4 mr-1" />
                {article.comments}
              </Button>
              <Button variant="outline" size="sm" className="border-2">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-96 md:h-[500px] mb-12 overflow-hidden rounded-lg">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="space-y-6 text-gray-800 leading-relaxed"
          />
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="outline" 
                className="hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <Card className="mt-12 border-2">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">{article.author.name}</h4>
                <p className="text-gray-600">{article.author.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Related Articles */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-wide">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((related) => (
              <Link key={related.id} href={`/editorial/article/${related.slug}`}>
                <Card className="border-2 hover:border-black transition-colors group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-white text-black font-bold">
                      {related.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold group-hover:text-gray-600 transition-colors">
                      {related.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation to next/previous articles */}
      <div className="border-t-2 border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <Button variant="outline" className="border-2 border-gray-300 hover:border-black">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Article
            </Button>
            <Button variant="outline" className="border-2 border-gray-300 hover:border-black">
              Next Article
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
