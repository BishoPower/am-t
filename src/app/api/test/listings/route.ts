import { NextResponse } from "next/server";
import { client as prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Testing database connection...");

    // First, count all listings
    const totalListings = await prisma.listing.count();
    console.log("Total listings in database:", totalListings);

    // Count public listings
    const publicListings = await prisma.listing.count({
      where: {
        isPrivate: false,
      },
    });
    console.log("Public listings:", publicListings);

    // Count active listings
    const activeListings = await prisma.listing.count({
      where: {
        status: "ACTIVE",
      },
    });
    console.log("Active listings:", activeListings);

    // Count public and active listings
    const publicActiveListings = await prisma.listing.count({
      where: {
        isPrivate: false,
        status: "ACTIVE",
      },
    });
    console.log("Public and active listings:", publicActiveListings);

    // Get a few sample listings
    const sampleListings = await prisma.listing.findMany({
      take: 5,
      select: {
        id: true,
        title: true,
        isPrivate: true,
        status: true,
        createdAt: true,
      },
    });
    console.log("Sample listings:", sampleListings);

    return NextResponse.json({
      totalListings,
      publicListings,
      activeListings,
      publicActiveListings,
      sampleListings,
    });
  } catch (error) {
    console.error("Database test error:", error);
    return NextResponse.json(
      { error: "Database connection failed", details: error },
      { status: 500 }
    );
  }
}
