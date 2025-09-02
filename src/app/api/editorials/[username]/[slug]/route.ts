import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";
import { isCurrentUserAdmin } from "@/lib/admin-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string; slug: string } }
) {
  try {
    const { username, slug } = params;

    const editorial = await client.editorial.findFirst({
      where: {
        slug: slug,
        author: {
          username: username,
        },
        published: true,
      },
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
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!editorial) {
      return NextResponse.json(
        { error: "Editorial not found" },
        { status: 404 }
      );
    }

    // Check if current user has liked this editorial
    const user = await currentUser();
    let isLiked = false;

    if (user) {
      const dbUser = await client.user.findUnique({
        where: { clerkid: user.id },
      });

      if (dbUser) {
        const like = await client.editorialLike.findUnique({
          where: {
            userId_editorialId: {
              userId: dbUser.id,
              editorialId: editorial.id,
            },
          },
        });
        isLiked = !!like;
      }
    }

    return NextResponse.json({
      ...editorial,
      likes: editorial._count.likes,
      comments: editorial._count.comments,
      isLiked,
    });
  } catch (error) {
    console.error("Error fetching editorial:", error);
    return NextResponse.json(
      { error: "Failed to fetch editorial" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { username: string; slug: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database, create if doesn't exist
    let dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      // Create user if doesn't exist
      dbUser = await client.user.create({
        data: {
          clerkid: user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
          username:
            user.username ||
            user.emailAddresses[0]?.emailAddress.split("@")[0] ||
            `user${Date.now()}`,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          image: user.imageUrl || null,
        },
      });
    }

    // Check if editorial exists
    const existingEditorial = await client.editorial.findFirst({
      where: {
        slug: params.slug,
        author: {
          username: params.username,
        },
      },
    });

    if (!existingEditorial) {
      return NextResponse.json(
        { error: "Editorial not found" },
        { status: 404 }
      );
    }

    // Check if user owns the editorial OR is an admin
    const isAdmin = await isCurrentUserAdmin();
    if (existingEditorial.authorId !== dbUser.id && !isAdmin) {
      return NextResponse.json(
        { error: "You can only edit your own editorials" },
        { status: 403 }
      );
    }

    const {
      title,
      subtitle,
      content,
      excerpt,
      image,
      category,
      tags,
      published,
      isStaffPicked, // New field for admin staff pick control
    } = await request.json();

    // Generate new slug if title changed
    let newSlug = existingEditorial.slug;
    if (title && title !== existingEditorial.title) {
      newSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim("-");

      // Ensure slug is unique for this author
      let uniqueSlug = newSlug;
      let counter = 1;
      while (
        await client.editorial.findFirst({
          where: {
            slug: uniqueSlug,
            authorId: dbUser.id,
            id: { not: existingEditorial.id },
          },
        })
      ) {
        uniqueSlug = `${newSlug}-${counter}`;
        counter++;
      }
      newSlug = uniqueSlug;
    }

    const editorial = await client.editorial.update({
      where: { id: existingEditorial.id },
      data: {
        ...(title && { title }),
        ...(subtitle !== undefined && { subtitle: subtitle || null }),
        ...(content && { content }),
        ...(excerpt !== undefined && {
          excerpt: excerpt || content?.substring(0, 200) + "...",
        }),
        ...(image !== undefined && { image: image || null }),
        ...(category && { category }),
        ...(tags && { tags: Array.isArray(tags) ? tags : [] }),
        ...(published !== undefined && { published: Boolean(published) }),
        ...(newSlug !== existingEditorial.slug && { slug: newSlug }),
        // Only admins can set staff pick status
        ...(isAdmin &&
          isStaffPicked !== undefined && {
            isStaffPicked: Boolean(isStaffPicked),
          }),
      },
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

    return NextResponse.json(editorial);
  } catch (error) {
    console.error("Error updating editorial:", error);
    return NextResponse.json(
      { error: "Failed to update editorial" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { username: string; slug: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database, create if doesn't exist
    let dbUser = await client.user.findUnique({
      where: { clerkid: user.id },
    });

    if (!dbUser) {
      // Create user if doesn't exist
      dbUser = await client.user.create({
        data: {
          clerkid: user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
          username:
            user.username ||
            user.emailAddresses[0]?.emailAddress.split("@")[0] ||
            `user${Date.now()}`,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          image: user.imageUrl || null,
        },
      });
    }

    // Check if editorial exists
    const existingEditorial = await client.editorial.findFirst({
      where: {
        slug: params.slug,
        author: {
          username: params.username,
        },
      },
    });

    if (!existingEditorial) {
      return NextResponse.json(
        { error: "Editorial not found" },
        { status: 404 }
      );
    }

    // Check if user owns the editorial OR is an admin
    const isAdmin = await isCurrentUserAdmin();
    if (existingEditorial.authorId !== dbUser.id && !isAdmin) {
      return NextResponse.json(
        { error: "You can only delete your own editorials" },
        { status: 403 }
      );
    }

    await client.editorial.delete({
      where: { id: existingEditorial.id },
    });

    return NextResponse.json({ message: "Editorial deleted successfully" });
  } catch (error) {
    console.error("Error deleting editorial:", error);
    return NextResponse.json(
      { error: "Failed to delete editorial" },
      { status: 500 }
    );
  }
}
