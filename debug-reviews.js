const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("=== Users ===");
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    console.log("Users:", users);

    console.log("\n=== Reviews ===");
    const reviews = await prisma.review.findMany({
      include: {
        reviewer: {
          select: {
            id: true,
            username: true,
          },
        },
        reviewee: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    console.log("Reviews:", reviews);

    if (users.length > 0) {
      const firstUser = users[0];
      console.log("\n=== Testing with first user ===");
      console.log("User ID:", firstUser.id);
      console.log("User ID type:", typeof firstUser.id);
      console.log("User ID length:", firstUser.id.length);

      // Try to find reviews for this user
      const userReviews = await prisma.review.findMany({
        where: { revieweeId: firstUser.id },
        include: {
          reviewer: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });
      console.log("Reviews for user:", userReviews);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
