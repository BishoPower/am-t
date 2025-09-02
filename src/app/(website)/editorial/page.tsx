"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ChevronRight, Plus, Star, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

type Editorial = {
  content: any;
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  image?: string;
  category: string;
  tags: string[];
  isStaffPicked: boolean;
  createdAt: string;
  author: {
    id: string;
    username: string;
    displayName?: string;
    firstName?: string;
    lastName?: string;
    image?: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
};

type EditorialResponse = {
  editorials: Editorial[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export default function EditorialPage() {
  const { user } = useUser();
  const [staffPicked, setStaffPicked] = useState<Editorial[]>([]);
  const [allPosts, setAllPosts] = useState<Editorial[]>([]);
  const [friendsPosts, setFriendsPosts] = useState<Editorial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchEditorials = async () => {
      try {
        // Fetch staff picked posts for hero section
        const staffResponse = await fetch(
          "/api/editorials?staffPicked=true&limit=5"
        );
        if (staffResponse.ok) {
          const staffData: EditorialResponse = await staffResponse.json();
          setStaffPicked(staffData.editorials);
        }

        // Fetch all posts
        const allResponse = await fetch("/api/editorials?limit=50");
        if (allResponse.ok) {
          const allData: EditorialResponse = await allResponse.json();
          setAllPosts(allData.editorials);

          // If user is logged in, fetch friends' posts
          if (user) {
            try {
              const friendsResponse = await fetch(
                "/api/friends?type=friends&format=users"
              );
              if (friendsResponse.ok) {
                const friends = await friendsResponse.json();
                // friends is now an array of user objects
                const friendIds = friends.map((friend: any) => friend.id);

                // Filter posts by friends
                const friendsEditorials = allData.editorials.filter((post) =>
                  friendIds.includes(post.author.id)
                );
                setFriendsPosts(friendsEditorials);
              }
            } catch (error) {
              console.error("Failed to fetch friends:", error);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch editorials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEditorials();
  }, [user]);

  const featuredPost = staffPicked[0];

  // Get all unique categories and tags for filtering
  const allCategories = Array.from(
    new Set(allPosts.map((post) => post.category))
  );
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

  // Filter and search logic
  const getFilteredPosts = () => {
    let filtered = allPosts;

    // Apply category/tag filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (post) =>
          post.category === selectedCategory ||
          post.tags.includes(selectedCategory)
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.subtitle?.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.content?.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.author.username.toLowerCase().includes(query) ||
          post.author.displayName?.toLowerCase().includes(query) ||
          `${post.author.firstName || ""} ${post.author.lastName || ""}`
            .toLowerCase()
            .includes(query)
      );
    }

    // Sort: friends first, then by creation date
    const friendIds = friendsPosts.map((post) => post.author.id);
    const friendsPart = filtered.filter((post) =>
      friendIds.includes(post.author.id)
    );
    const othersPart = filtered.filter(
      (post) => !friendIds.includes(post.author.id)
    );

    return [...friendsPart, ...othersPart];
  };

  const filteredPosts = getFilteredPosts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Create Post Button */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Community Posts
              </h1>
              <p className="text-gray-600 mt-1">
                Discover style insights and fashion stories from our community
              </p>
            </div>
            {user && (
              <Link href="/editorial/create">
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Post
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Featured/Hero Section - Staff Picked Posts */}
      {featuredPost && (
        <div className="relative">
          <div className="relative h-[70vh] w-full overflow-hidden">
            <Image
              src={featuredPost.image || "/amtlogo-static.png"}
              alt={featuredPost.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-yellow-500 text-black"
                  >
                    <Star className="w-3 h-3 mr-1" />
                    Staff Pick
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-white/20 text-white border-white/30"
                  >
                    {featuredPost.category}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {featuredPost.title}
                </h1>

                {featuredPost.subtitle && (
                  <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
                    {featuredPost.subtitle}
                  </p>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-white/80">
                    <User className="w-4 h-4" />
                    <span className="text-sm">
                      {featuredPost.author.displayName ||
                        `${featuredPost.author.firstName || ""} ${
                          featuredPost.author.lastName || ""
                        }`.trim() ||
                        featuredPost.author.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(featuredPost.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/editorial/article/${featuredPost.author.username}/${featuredPost.slug}`}
                >
                  <Button size="lg" className="group">
                    Read Article
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff Picked Carousel */}
      {staffPicked.length > 1 && (
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Staff Picks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {staffPicked.slice(1).map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image || "/amtlogo-static.png"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-yellow-500 text-black"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Staff Pick
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">
                      {post.category}
                    </Badge>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {post.author.displayName ||
                          `${post.author.firstName || ""} ${
                            post.author.lastName || ""
                          }`.trim() ||
                          post.author.username}
                      </span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Link
                      href={`/editorial/article/${post.author.username}/${post.slug}`}
                    >
                      <Button variant="ghost" size="sm" className="w-full mt-3">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border p-6 sticky top-4">
              {/* Search Bar */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Search
                </h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search posts, authors, tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

              {/* Clear All Filters */}
              {(selectedCategory || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("");
                  }}
                  className="w-full mb-4 text-gray-500 hover:text-gray-700"
                >
                  Clear All Filters
                </Button>
              )}

              {/* Categories */}
              {allCategories.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {allCategories.map((category) => (
                      <button
                        key={`cat-${category}`}
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === category ? null : category
                          )
                        }
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? "bg-black text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {allTags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Popular Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 15).map((tag) => (
                      <button
                        key={`tag-${tag}`}
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === tag ? null : tag
                          )
                        }
                        className={`px-2 py-1 rounded-full text-xs transition-colors ${
                          selectedCategory === tag
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                  {allTags.length > 15 && (
                    <p className="text-xs text-gray-400 mt-2">
                      +{allTags.length - 15} more tags
                    </p>
                  )}
                </div>
              )}

              {/* Friends Section */}
              {user && friendsPosts.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Friends' Posts ({friendsPosts.length})
                  </h4>
                  <p className="text-xs text-gray-500">
                    Posts from your friends appear first in the feed
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery
                  ? `Search: "${searchQuery}"`
                  : selectedCategory
                  ? `Posts: ${
                      selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1)
                    }`
                  : "Community Posts"}
              </h2>
              <div className="text-sm text-gray-500">
                {filteredPosts.length} post
                {filteredPosts.length !== 1 ? "s" : ""}
                {friendsPosts.length > 0 &&
                  !searchQuery &&
                  !selectedCategory && (
                    <span className="ml-2 text-blue-600">
                      • Friends' posts shown first
                    </span>
                  )}
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className="group hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
                      <Image
                        src={post.image || "/amtlogo-static.png"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {post.isStaffPicked && (
                        <div className="absolute top-3 left-3">
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500 text-black"
                          >
                            <Star className="w-3 h-3 mr-1" />
                            Staff Pick
                          </Badge>
                        </div>
                      )}
                      {friendsPosts.some((fp) => fp.id === post.id) && (
                        <div className="absolute top-3 right-3">
                          <Badge
                            variant="secondary"
                            className="bg-blue-500 text-white"
                          >
                            Friend
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex gap-2 text-xs text-gray-500">
                          <span>❤️ {post._count.likes}</span>
                          <span>💬 {post._count.comments}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      {post.subtitle && (
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {post.subtitle}
                        </p>
                      )}

                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
                            {post.author.image && (
                              <Image
                                src={post.author.image}
                                alt={post.author.username}
                                width={24}
                                height={24}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <span>
                            {post.author.displayName ||
                              `${post.author.firstName || ""} ${
                                post.author.lastName || ""
                              }`.trim() ||
                              post.author.username}
                          </span>
                        </div>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              #{tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{post.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <Link
                        href={`/editorial/article/${post.author.username}/${post.slug}`}
                      >
                        <Button variant="outline" className="w-full group">
                          Read Article
                          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery
                    ? `No posts found for "${searchQuery}"`
                    : selectedCategory
                    ? `No posts found in ${selectedCategory}`
                    : "No posts available"}
                </p>
                {user && !searchQuery && !selectedCategory && (
                  <Link href="/editorial/create">
                    <Button className="mt-4">Create the first post</Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
