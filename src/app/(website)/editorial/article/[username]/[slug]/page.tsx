"use client";

import React, { useEffect, useState } from "react";
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
  ChevronRight,
  Edit,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { AdminControls } from "@/components/admin/AdminControls";
import { useIsAdmin } from "@/hooks/use-admin";

type ArticleData = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
  excerpt?: string;
  image: string;
  category: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  createdAt: string;
  tags: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  published: boolean;
  isStaffPicked?: boolean; // Add staff pick status
};

export default function ArticlePage() {
  const params = useParams();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { isAdmin } = useIsAdmin();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!params.username || !params.slug) return;

      try {
        // Fetch article by username and slug
        const response = await fetch(
          `/api/editorials/${params.username}/${params.slug}`
        );

        if (response.ok) {
          const articleData = await response.json();
          setArticle(articleData);

          // Fetch related articles from the same author
          const relatedResponse = await fetch(
            `/api/editorials?authorUsername=${params.username}&limit=3&exclude=${params.slug}`
          );
          if (relatedResponse.ok) {
            const { editorials } = await relatedResponse.json();
            setRelatedArticles(editorials);
          }
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [params.username, params.slug]);

  const handleLike = async () => {
    if (!isSignedIn || !article || isLiking) return;

    setIsLiking(true);
    try {
      const response = await fetch(
        `/api/editorials/${params.username}/${params.slug}/like`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setArticle((prev) =>
          prev
            ? {
                ...prev,
                likes: data.likeCount,
                isLiked: data.isLiked,
              }
            : null
        );
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  // Helper function to render content sections
  const renderContent = (content: string) => {
    // Split content by markdown patterns and render accordingly
    const sections = content.split("\n\n");

    return sections.map((section, index) => {
      if (section.startsWith("## ")) {
        // Heading
        return (
          <h2
            key={index}
            className="text-2xl font-bold text-gray-900 mt-8 mb-4"
          >
            {section.replace("## ", "")}
          </h2>
        );
      } else if (section.startsWith("> ")) {
        // Quote
        return (
          <blockquote
            key={index}
            className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-6"
          >
            {section.replace("> ", "")}
          </blockquote>
        );
      } else if (section.includes("![")) {
        // Image
        const imageMatch = section.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (imageMatch) {
          const [, alt, src] = imageMatch;
          const caption = section.includes("\n*")
            ? section.split("\n*")[1]?.replace("*", "")
            : "";

          return (
            <div key={index} className="my-6">
              <img
                src={src}
                alt={alt}
                className="w-full h-auto object-contain max-h-96 rounded-lg"
              />
              {caption && (
                <p className="text-sm text-gray-500 italic text-center mt-2">
                  {caption}
                </p>
              )}
            </div>
          );
        }
      } else if (section.startsWith("- ")) {
        // List
        const items = section
          .split("\n")
          .filter((item) => item.startsWith("- "));
        return (
          <ul key={index} className="list-disc pl-6 my-4 space-y-2">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700">
                {item.replace("- ", "")}
              </li>
            ))}
          </ul>
        );
      } else {
        // Paragraph
        return section.trim() ? (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {section}
          </p>
        ) : null;
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link href="/editorial">
            <Button>Back to Editorial</Button>
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Admin Controls - Only visible to admins */}
      {article && isAdmin && (
        <div className="max-w-4xl mx-auto px-4">
          <AdminControls
            editorial={{
              id: article.id,
              slug: article.slug,
              title: article.title,
              isStaffPicked: article.isStaffPicked || false,
              author: {
                username: article.author.username,
                displayName: article.author.displayName,
              },
            }}
            isAdmin={isAdmin}
            onEditorialUpdate={() => {
              // Refresh the article data
              window.location.reload();
            }}
            onEditorialDelete={() => {
              // Redirect to editorial listing
              window.location.href = "/editorial";
            }}
          />
        </div>
      )}

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Badge className="mb-4 bg-black text-white font-bold">
            {article.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-xl text-gray-600 mb-8">{article.subtitle}</p>
          )}

          {/* Article Meta */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b-2 border-gray-200">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={article.author.image || "/amtlogo-static.png"}
                    alt={article.author.displayName || article.author.username}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm">
                    {article.author.displayName ||
                      `${article.author.firstName} ${article.author.lastName}` ||
                      article.author.username}
                  </p>
                  <p className="text-xs text-gray-500">
                    @{article.author.username}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex items-center gap-4">
              {/* Edit Button - Only visible to author or admin */}
              {user &&
                (user.username === article.author.username || isAdmin) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2"
                    asChild
                  >
                    <Link
                      href={`/editorial/edit/${article.author.username}/${article.slug}`}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                )}

              <Button
                variant="outline"
                size="sm"
                className={`border-2 ${
                  article.isLiked ? "bg-red-50 border-red-500 text-red-600" : ""
                }`}
                onClick={handleLike}
                disabled={!isSignedIn || isLiking}
              >
                <Heart
                  className={`h-4 w-4 mr-1 ${
                    article.isLiked ? "fill-current" : ""
                  }`}
                />
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
        {article.image && (
          <div className="relative h-96 md:h-[500px] mb-12 overflow-hidden rounded-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-contain"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="space-y-6 text-gray-800 leading-relaxed">
            {renderContent(article.content)}
          </div>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <h3 className="text-lg font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <Card className="mt-12 border-2">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src={article.author.image || "/amtlogo-static.png"}
                  alt={article.author.displayName || article.author.username}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">
                  {article.author.displayName ||
                    `${article.author.firstName} ${article.author.lastName}` ||
                    article.author.username}
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  @{article.author.username}
                </p>
                <Link
                  href={`/profile/${article.author.username}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 uppercase tracking-wide">
              More from @{article.author.username}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/editorial/article/${related.author.username}/${related.slug}`}
                >
                  <Card className="border-2 hover:border-black transition-colors group cursor-pointer">
                    {related.image && (
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
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-bold group-hover:text-gray-600 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(related.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
