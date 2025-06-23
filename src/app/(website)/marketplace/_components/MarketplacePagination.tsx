"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReadonlyURLSearchParams } from "next/navigation";

interface MarketplacePaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: ReadonlyURLSearchParams;
}

export default function MarketplacePagination({
  currentPage,
  totalPages,
  searchParams,
}: MarketplacePaginationProps) {
  const router = useRouter();

  const navigateToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());
    router.push(`/marketplace?${newParams.toString()}`);
  };

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 7; // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the beginning
        pages.push(2, 3, 4);
        if (totalPages > 4) pages.push(-1); // ellipsis
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        if (totalPages > 4) pages.push(-1); // ellipsis
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle
        pages.push(-1); // ellipsis
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push(-1); // ellipsis
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          if (page === -1) {
            // Ellipsis
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-gray-400"
              >
                ...
              </span>
            );
          }

          const isCurrentPage = page === currentPage;

          return (
            <Button
              key={page}
              variant={isCurrentPage ? "default" : "outline"}
              size="sm"
              onClick={() => navigateToPage(page)}
              className={`min-w-[40px] ${
                isCurrentPage
                  ? "bg-black text-white hover:bg-gray-800"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Page info */}
      <div className="hidden md:flex items-center text-sm text-gray-500 ml-4">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
