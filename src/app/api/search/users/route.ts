import { NextRequest, NextResponse } from "next/server";
import { searchUsers } from "@/actions/user";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q") || "";
    const key = request.nextUrl.searchParams.get("key") || "";

    const result = await searchUsers(query, key);

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json({ results: result.results });
  } catch (error) {
    console.error("Error in users search API:", error);
    return NextResponse.json(
      { error: "Server error processing search" },
      { status: 500 }
    );
  }
}
