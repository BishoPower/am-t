"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  slug: string;
  date: string;
  author?: {
    username: string;
    displayName?: string;
    firstName?: string;
    lastName?: string;
  };
};

type MagazineCarouselProps = {
  articles: Article[];
};

export default function MagazineCarousel({ articles }: MagazineCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Don't render if no articles
  if (!articles || articles.length === 0) {
    return null;
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || articles.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, articles.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  if (!articles || articles.length === 0) {
    return (
      <div className="relative h-[70vh] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No featured articles available</p>
      </div>
    );
  }

  const currentArticle = articles[currentIndex];
  return (
    <div className="relative h-[70vh] overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentArticle.image}
          alt={currentArticle.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={currentIndex === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      {/* Navigation Arrows */}
      {articles.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}{" "}
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
        <div className="max-w-6xl mx-auto">
          <Badge className="mb-4 bg-white text-black hover:bg-gray-100 font-bold text-sm px-3 py-1 uppercase tracking-wide">
            {currentArticle.category}
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl">
            {currentArticle.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl">
            {currentArticle.subtitle}
          </p>

          <Link
            href={`/editorial/article/${
              currentArticle.author?.username || "admin"
            }/${currentArticle.slug}`}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 font-bold transition-all hover:scale-105 uppercase tracking-wide border-2 border-white"
            >
              READ MORE
            </Button>
          </Link>
        </div>
      </div>
      {/* Dots Indicator - Bottom Center */}
      {articles.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
      {/* Progress Bar (for auto-play) */}
      {isAutoPlaying && articles.length > 1 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-[5000ms] linear"
            style={{
              width: isAutoPlaying ? "100%" : "0%",
              transition: isAutoPlaying ? "width 5s linear" : "none",
            }}
          />
        </div>
      )}
    </div>
  );
}
