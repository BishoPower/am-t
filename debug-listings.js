// Simple script to check what's in the database
require("dotenv").config();
const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log("Checking database...");

    // Check users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    console.log("Users found:", users.length);
    console.log("First few users:", users.slice(0, 3));

    // Check listings
    const listings = await prisma.listing.findMany({
      select: {
        id: true,
        title: true,
      },
      take: 5,
    });
    console.log("\nListings found:", listings.length);
    console.log("First few listings:", listings);

    if (listings.length > 0) {
      console.log("\nFirst listing ID:", listings[0].id);
      console.log("ID type:", typeof listings[0].id);
      console.log("ID length:", listings[0].id.length);

      // Test the UUID regex
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      console.log("Is valid UUID:", uuidRegex.test(listings[0].id));
    }
  } catch (error) {
    console.error("Database error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
