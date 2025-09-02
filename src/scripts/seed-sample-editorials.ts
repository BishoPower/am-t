import { client } from "../lib/prisma";

async function seedSampleEditorials() {
  try {
    console.log("Starting to seed sample editorials...");

    // Find or create admin user
    let adminUser = await client.user.findFirst({
      where: { email: "admin@am-t.com" },
    });

    if (!adminUser) {
      console.log("Creating admin user...");
      adminUser = await client.user.create({
        data: {
          clerkid: "admin-user",
          email: "admin@am-t.com",
          username: "admin",
          firstName: "AM-T",
          lastName: "Editorial",
          image: "/amtlogo-static.png",
        },
      });
    }

    // Sample editorials data
    const sampleEditorials = [
      {
        slug: "welcome-to-am-t",
        title: "Welcome to AM-T",
        subtitle: "Your ultimate destination for authentic streetwear trading",
        content:
          "Discover the future of fashion trading with AM-T. Connect with a community of authentic streetwear enthusiasts, find rare pieces, and trade with confidence in a trusted marketplace.",
        excerpt:
          "Discover the future of fashion trading with AM-T. Connect with a community of authentic streetwear enthusiasts...",
        category: "Welcome",
        tags: ["welcome", "getting-started", "community"],
        isStaffPicked: true,
        image: "/amtlogo-static.png",
      },
      {
        slug: "getting-started-guide",
        title: "Getting Started with AM-T",
        subtitle: "Everything you need to know to begin your trading journey",
        content:
          "Everything you need to know to begin trading on AM-T. From setting up your profile to making your first trade, this comprehensive guide will walk you through every step.",
        excerpt:
          "Everything you need to know to begin trading on AM-T. From setting up your profile to making your first trade...",
        category: "Guide",
        tags: ["guide", "tutorial", "beginners"],
        isStaffPicked: true,
        image: "/amtlogo-static.png",
      },
      {
        slug: "building-trading-profile",
        title: "Building Your Trading Profile",
        subtitle: "Create an attractive and trustworthy trader profile",
        content:
          "How to create an attractive and trustworthy trader profile that will help you succeed in the AM-T marketplace. Learn about verification, photos, descriptions, and more.",
        excerpt:
          "How to create an attractive and trustworthy trader profile that will help you succeed in the AM-T marketplace...",
        category: "Guide",
        tags: ["profile", "trading", "tips"],
        isStaffPicked: false,
        image: "/amtlogo-static.png",
      },
      {
        slug: "streetwear-authentication-tips",
        title: "Streetwear Authentication Tips",
        subtitle: "How to spot authentic vs fake streetwear",
        content:
          "Learn the key indicators that separate authentic streetwear from counterfeits. From stitching details to material quality, we cover everything you need to know.",
        excerpt:
          "Learn the key indicators that separate authentic streetwear from counterfeits. From stitching details to material quality...",
        category: "Authentication",
        tags: ["authentication", "streetwear", "tips", "fake"],
        isStaffPicked: true,
        image: "/amtlogo-static.png",
      },
      {
        slug: "community-guidelines",
        title: "Community Guidelines",
        subtitle: "Understanding AM-T's community standards and policies",
        content:
          "Understanding AM-T's community standards and policies. Learn about our rules, expectations, and how to be a great member of our trading community.",
        excerpt:
          "Understanding AM-T's community standards and policies. Learn about our rules, expectations...",
        category: "Policy",
        tags: ["guidelines", "community", "rules"],
        isStaffPicked: false,
        image: "/amtlogo-static.png",
      },
    ];

    // Create editorials
    for (const editorialData of sampleEditorials) {
      const existingEditorial = await client.editorial.findFirst({
        where: {
          slug: editorialData.slug,
          authorId: adminUser.id,
        },
      });

      if (!existingEditorial) {
        console.log(`Creating editorial: ${editorialData.title}`);
        await client.editorial.create({
          data: {
            ...editorialData,
            authorId: adminUser.id,
            published: true,
          },
        });
      } else {
        console.log(`Editorial already exists: ${editorialData.title}`);
      }
    }

    console.log("Sample editorials seeded successfully!");

    // Show final count
    const totalEditorials = await client.editorial.count();
    console.log(`Total editorials in database: ${totalEditorials}`);
  } catch (error) {
    console.error("Error seeding editorials:", error);
  } finally {
    await client.$disconnect();
  }
}

seedSampleEditorials();
