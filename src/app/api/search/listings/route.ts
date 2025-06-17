import { NextRequest, NextResponse } from "next/server";
import { searchListings } from "@/actions/user";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q");
    const tags = request.nextUrl.searchParams.get("tags");
    const key = request.nextUrl.searchParams.get("key");

    console.log("=== Search API called ===");
    console.log("- query:", JSON.stringify(query), "type:", typeof query);
    console.log("- tags:", JSON.stringify(tags), "type:", typeof tags);
    console.log("- key:", JSON.stringify(key), "type:", typeof key);

    const result = await searchListings(
      query || "",
      key || "",
      tags || undefined
    );

    console.log("Search result status:", result.status);
    console.log("Search result count:", result.results?.length || 0);

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json({ results: result.results });
  } catch (error) {
    console.error("Error in listings search API:", error);
    return NextResponse.json(
      { error: "Server error processing search" },
      { status: 500 }
    );
  }
}
