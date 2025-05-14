"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { list } from "postcss";

export const onAuthenticatedUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const userExists = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        closet: true,
      },
    });
    if (userExists) {
      return { status: 200, user: userExists };
    }
    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        username: user.username,
        image: user.imageUrl,
        closet: {
          create: {
            name: `${user.username}'s Closet`,
            description: "My Closet",
            image: user.imageUrl,
          },
        },
      },
      include: {
        closet: true,
      },
    });
    if (newUser) {
      return { status: 201, user: newUser };
    }
    return { status: 400 };
  } catch (eror) {
    return { status: 500 };
  }
};
