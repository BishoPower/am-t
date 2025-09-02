import { client } from "@/lib/prisma";

/**
 * Script to make a user an admin
 * Usage: npm run script:make-admin <username>
 */
async function makeUserAdmin() {
  const username = process.argv[2];

  if (!username) {
    console.error("Usage: npm run script:make-admin <username>");
    process.exit(1);
  }

  try {
    const user = await client.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.error(`User with username "${username}" not found`);
      process.exit(1);
    }

    if (user.isAdmin) {
      console.log(`User "${username}" is already an admin`);
      process.exit(0);
    }

    const updatedUser = await client.user.update({
      where: { username },
      data: { isAdmin: true },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        isAdmin: true,
      },
    });

    console.log(`✅ Successfully made user "${username}" an admin:`);
    console.log(JSON.stringify(updatedUser, null, 2));
  } catch (error) {
    console.error("Error making user admin:", error);
    process.exit(1);
  } finally {
    await client.$disconnect();
  }
}

makeUserAdmin();
