import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { client as prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";

// Helper function to get blocked user IDs for the current user
async function getBlockedUserIds(currentUserId: string): Promise<string[]> {
  const blocks = await prisma.blockedUser.findMany({
    where: {
      OR: [{ blockerId: currentUserId }, { blockedId: currentUserId }],
    },
    select: {
      blockerId: true,
      blockedId: true,
    },
  });

  return blocks.map((block) =>
    block.blockerId === currentUserId ? block.blockedId : block.blockerId
  );
}

// Helper function to filter out common words that don't help with similarity
function isCommonWord(word: string): boolean {
  const commonWords = new Set([
    "the",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "from",
    "up",
    "about",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "under",
    "between",
    "among",
    "this",
    "that",
    "these",
    "those",
    "is",
    "are",
    "was",
    "were",
    "been",
    "be",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "must",
    "can",
    "very",
    "really",
    "just",
    "still",
    "also",
    "too",
    "only",
    "even",
    "get",
    "got",
    "make",
    "made",
    "take",
    "took",
    "come",
    "came",
    "good",
    "great",
    "nice",
    "best",
    "new",
    "old",
    "big",
    "small",
    "long",
    "short",
    "high",
    "low",
    "like",
    "love",
    "want",
    "need",
    "know",
    "think",
    "see",
    "look",
    "find",
    "give",
    "use",
    "used",
    "item",
    "items",
    "thing",
    "things",
    "stuff",
    "piece",
    "pieces",
    "set",
    "collection",
    "size",
    "color",
    "brand",
    "quality",
    "condition",
    "price",
  ]);
  return commonWords.has(word.toLowerCase());
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "6");

    // Get blocked user IDs if user is authenticated
    let blockedUserIds: string[] = [];
    if (userId) {
      const dbUser = await prisma.user.findUnique({
        where: { clerkid: userId },
        select: { id: true },
      });
      if (dbUser) {
        blockedUserIds = await getBlockedUserIds(dbUser.id);
      }
    }

    // First, get the current listing to analyze its properties
    const currentListing = await prisma.listing.findUnique({
      where: { id },
      include: {
        tags: true,
        user: true,
      },
    });

    if (!currentListing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    } // Extract meaningful keywords from title and description
    const titleWords = currentListing.title
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3 && !isCommonWord(word)); // Filter out short words and common words

    const descriptionWords = currentListing.description
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 4 && !isCommonWord(word)) // Filter out short words and common words
      .slice(0, 10); // Limit to first 10 meaningful words

    const tagNames = currentListing.tags.map((tag) => tag.name);
    console.log("Finding similar listings for:", currentListing.title);
    console.log("Using tags:", tagNames);
    console.log("Using title keywords:", titleWords.slice(0, 5));
    console.log("Current listing ID:", id);
    console.log("Current listing user ID:", currentListing.userId);

    // If no tags and no meaningful keywords, return empty array
    if (tagNames.length === 0 && titleWords.length === 0) {
      console.log("No tags or keywords found, returning empty array");
      return NextResponse.json([]);
    }

    // Build conditions with priority for tags and exact phrases
    const conditions: Prisma.ListingWhereInput[] = [];

    // High priority: Tag matches
    if (tagNames.length > 0) {
      conditions.push({
        tags: {
          some: {
            name: { in: tagNames },
          },
        },
      });
    }

    // Medium priority: Title contains multiple keywords
    if (titleWords.length >= 2) {
      for (let i = 0; i < titleWords.length - 1; i++) {
        conditions.push({
          title: {
            contains: `${titleWords[i]} ${titleWords[i + 1]}`,
            mode: Prisma.QueryMode.insensitive,
          },
        });
      }
    } // Lower priority: Only the most meaningful individual title words (length > 4)
    const meaningfulTitleWords = titleWords.filter((word) => word.length > 4);
    meaningfulTitleWords.slice(0, 3).forEach((word) => {
      conditions.push({
        title: {
          contains: word,
          mode: Prisma.QueryMode.insensitive,
        },
      });
    });

    // Skip description-based conditions entirely to be more strict// Safety check: if no meaningful conditions were built, return empty array
    if (conditions.length === 0) {
      console.log("No meaningful conditions built, returning empty array");
      return NextResponse.json([]);
    }

    console.log("Built", conditions.length, "conditions for similarity search"); // Find similar listings using the conditions we built
    const similarListings = await prisma.listing.findMany({
      where: {
        AND: [
          { id: { not: id } }, // Exclude current listing
          { isPrivate: false }, // Only public listings
          { status: "ACTIVE" }, // Only active listings
          { userId: { not: currentListing.userId } }, // Exclude listings from same user
          ...(blockedUserIds.length > 0
            ? [{ userId: { notIn: blockedUserIds } }]
            : []), // Exclude blocked users
          {
            OR: conditions.slice(0, 8), // Allow more conditions to get more potential matches
          },
        ],
      },
      include: {
        tags: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: {
            favorites: true,
          },
        },
      },
      take: limit * 3, // Get more listings to score and filter
    });
    console.log("Found potential similar listings:", similarListings.length);

    // Score listings based on similarity with much higher standards
    const scoredListings = similarListings.map((listing) => {
      let score = 0;

      // Tag similarity (very high weight - this is the most important)
      const listingTagNames = listing.tags.map((tag: any) => tag.name);
      const commonTags = tagNames.filter((tag) =>
        listingTagNames.includes(tag)
      );
      score += commonTags.length * 100; // Much higher weight for tag matches

      // Exact phrase matches in title (very high weight)
      const listingTitleLower = listing.title.toLowerCase();
      const currentTitleLower = currentListing.title.toLowerCase();

      // Check for multi-word phrase matches
      for (let i = 0; i < titleWords.length - 1; i++) {
        const phrase = `${titleWords[i]} ${titleWords[i + 1]}`;
        if (listingTitleLower.includes(phrase)) {
          score += 50; // High score for phrase matches
        }
      }

      // Individual meaningful word matches in title (medium weight)
      const listingTitleWords = listingTitleLower.split(/\s+/);
      const meaningfulMatches = titleWords.filter((word) =>
        listingTitleWords.some(
          (lWord) =>
            lWord === word ||
            (lWord.length > 5 &&
              word.length > 5 &&
              (lWord.includes(word) || word.includes(lWord)))
        )
      );
      score += meaningfulMatches.length * 20;

      // Category/type similarity (check if both are same type of item)
      const categoryWords = [
        "shirt",
        "jacket",
        "pants",
        "shoes",
        "sneakers",
        "boots",
        "dress",
        "skirt",
        "sweater",
        "hoodie",
        "jeans",
        "shorts",
        "coat",
        "blazer",
        "suit",
        "watch",
        "bag",
        "hat",
        "cap",
      ];

      const currentCategory = categoryWords.find(
        (cat) =>
          currentTitleLower.includes(cat) ||
          currentListing.description.toLowerCase().includes(cat)
      );
      const listingCategory = categoryWords.find(
        (cat) =>
          listingTitleLower.includes(cat) ||
          listing.description.toLowerCase().includes(cat)
      );

      if (
        currentCategory &&
        listingCategory &&
        currentCategory === listingCategory
      ) {
        score += 30; // Bonus for same category
      }

      // Description similarity (lower weight, only for very specific matches)
      if (descriptionWords.length > 0) {
        const listingDescLower = listing.description.toLowerCase();
        const commonDescWords = descriptionWords.filter((word) =>
          listingDescLower.includes(word)
        );
        score += commonDescWords.length * 5;
      }

      // Slight boost for popularity, but don't let it dominate
      score += Math.min(listing._count.favorites * 2, 10);
      console.log(
        `Similarity for "${listing.title}": ${score} (tags: ${
          commonTags.length
        }/${tagNames.length}, meaningful words: ${meaningfulMatches.length}/${
          titleWords.length
        }, tag score: ${commonTags.length * 100}, word score: ${
          meaningfulMatches.length * 20
        })`
      );

      return {
        ...listing,
        similarityScore: score,
      };
    });

    console.log("Listings before filtering:", scoredListings.length);
    console.log(
      "Score distribution:",
      scoredListings.map((l) => `${l.title}: ${l.similarityScore}`).slice(0, 10)
    ); // Sort by similarity score and apply stricter filtering
    const topSimilarListings = scoredListings
      .filter((listing) => {
        // More reasonable but still strict criteria
        const commonTagsCount =
          tagNames.length > 0
            ? listing.tags.filter((tag: any) => tagNames.includes(tag.name))
                .length
            : 0;
        const hasAnyTagMatch = commonTagsCount > 0; // At least 1 matching tag
        const hasMultipleTags = commonTagsCount >= 2; // 2+ matching tags (best case)
        const hasGoodScore = listing.similarityScore >= 50; // Good similarity score
        const hasExcellentScore = listing.similarityScore >= 80; // Excellent similarity score

        // Extract meaningful words for title comparison (exclude common words)
        const listingTitleWords = listing.title
          .toLowerCase()
          .split(/\s+/)
          .filter(
            (word) =>
              word.length > 3 &&
              ![
                "and",
                "the",
                "for",
                "with",
                "size",
                "color",
                "new",
                "used",
              ].includes(word)
          );
        const currentTitleWords = currentListing.title
          .toLowerCase()
          .split(/\s+/)
          .filter(
            (word) =>
              word.length > 3 &&
              ![
                "and",
                "the",
                "for",
                "with",
                "size",
                "color",
                "new",
                "used",
              ].includes(word)
          );

        const titleWordOverlap = currentTitleWords.filter((word) =>
          listingTitleWords.some(
            (lWord) =>
              lWord === word ||
              (word.length > 4 &&
                lWord.length > 4 &&
                (word.includes(lWord) || lWord.includes(word)))
          )
        ).length;
        const hasStrongTitleSimilarity = titleWordOverlap >= 2; // 2+ meaningful word matches
        const hasGoodTitleSimilarity = titleWordOverlap >= 1; // At least 1 meaningful word match

        console.log(
          `Filtering "${listing.title}": score=${listing.similarityScore}, commonTags=${commonTagsCount}/${tagNames.length}, titleOverlap=${titleWordOverlap}`
        );

        // Progressive criteria (ordered by preference):
        // 1. Multiple tag matches (best case) - any score
        if (hasMultipleTags) {
          console.log(`  -> PASS: Multiple tags (${commonTagsCount})`);
          return true;
        }

        // 2. Excellent score + any tag match
        if (hasExcellentScore && hasAnyTagMatch) {
          console.log(`  -> PASS: Excellent score + tag match`);
          return true;
        }

        // 3. Good score + strong title similarity + tag match
        if (hasGoodScore && hasStrongTitleSimilarity && hasAnyTagMatch) {
          console.log(`  -> PASS: Good score + strong title + tag match`);
          return true;
        }

        // 4. Excellent score + strong title similarity (even without tag match)
        if (hasExcellentScore && hasStrongTitleSimilarity) {
          console.log(`  -> PASS: Excellent score + strong title similarity`);
          return true;
        }

        console.log(`  -> FAIL: No criteria met`);
        return false;
      })
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, limit)
      .map(({ similarityScore, ...listing }) => listing);
    console.log("Final similar listings:", topSimilarListings.length);

    // If no listings passed the strict criteria, try a more lenient approach
    if (topSimilarListings.length === 0 && scoredListings.length > 0) {
      console.log(
        "No listings passed strict criteria, trying more lenient filtering..."
      );

      const fallbackListings = scoredListings
        .filter((listing) => {
          const commonTagsCount =
            tagNames.length > 0
              ? listing.tags.filter((tag: any) => tagNames.includes(tag.name))
                  .length
              : 0;
          const hasAnyTagMatch = commonTagsCount > 0;
          const hasDecentScore = listing.similarityScore >= 25; // Lower threshold

          console.log(
            `Fallback filtering "${listing.title}": score=${listing.similarityScore}, tags=${commonTagsCount}, hasTag=${hasAnyTagMatch}, hasScore=${hasDecentScore}`
          );

          // More lenient criteria: either tag match OR decent score
          return hasAnyTagMatch || hasDecentScore;
        })
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .slice(0, Math.min(6, limit)) // Limit to fewer results
        .map(({ similarityScore, ...listing }) => listing);

      console.log("Fallback similar listings:", fallbackListings.length);
      return NextResponse.json(fallbackListings);
    }

    return NextResponse.json(topSimilarListings);
  } catch (error) {
    console.error("Get similar listings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch similar listings" },
      { status: 500 }
    );
  }
}
