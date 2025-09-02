import { client } from "./src/lib/prisma.ts";

async function checkEditorials() {
  try {
    const editorials = await client.editorial.findMany({
      select: {
        id: true,
        slug: true,
        authorId: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    console.log("Current editorials:");
    editorials.forEach((editorial) => {
      console.log(
        `- ${editorial.slug} by ${editorial.author.username} (${editorial.authorId})`
      );
    });

    // Check for duplicate slugs
    const slugCounts = new Map();
    editorials.forEach((editorial) => {
      const key = `${editorial.authorId}-${editorial.slug}`;
      slugCounts.set(key, (slugCounts.get(key) || 0) + 1);
    });

    const duplicates = Array.from(slugCounts.entries()).filter(
      ([_, count]) => count > 1
    );

    if (duplicates.length > 0) {
      console.log("\nDuplicate author-slug combinations found:");
      duplicates.forEach(([key, count]) => {
        console.log(`- ${key}: ${count} duplicates`);
      });
    } else {
      console.log(
        "\nNo duplicate author-slug combinations found. Migration should be safe."
      );
    }

    await client.$disconnect();
  } catch (error) {
    console.error("Error:", error);
    await client.$disconnect();
  }
}

checkEditorials();
