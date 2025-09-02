import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

// This would typically check for admin role
// For now, we'll allow any authenticated user to demonstrate the feature
export async function PATCH(
  request: NextRequest,
  { params }: { params: { username: string; slug: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In a real app, you'd check if user has admin privileges
    // const isAdmin = await checkIfUserIsAdmin(user.id);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    // }

    const { isStaffPicked } = await request.json();

    // Fetch the editorial by username and slug
    const editorial = await client.editorial.findFirst({
      where: {
        slug: params.slug,
        author: {
          username: params.username,
        },
      },
    });

    if (!editorial) {
      return NextResponse.json(
        { error: "Editorial not found" },
        { status: 404 }
      );
    }

    const updatedEditorial = await client.editorial.update({
      where: { id: editorial.id },
      data: { isStaffPicked: Boolean(isStaffPicked) },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(updatedEditorial);
  } catch (error) {
    console.error("Error updating staff pick status:", error);
    return NextResponse.json(
      { error: "Failed to update staff pick status" },
      { status: 500 }
    );
  }
}
