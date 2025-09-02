"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { useIsAdmin } from "@/hooks/use-admin";
import EditorialForm from "@/components/editorial/EditorialForm";

type EditorialData = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
  excerpt?: string;
  image?: string;
  category: string;
  tags: string[];
  published: boolean;
  isStaffPicked: boolean;
  author: {
    id: string;
    username: string;
    displayName?: string;
  };
};

export default function EditEditorialPage() {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { isAdmin } = useIsAdmin();
  const { toast } = useToast();

  const [editorial, setEditorial] = useState<EditorialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    const fetchEditorial = async () => {
      try {
        const response = await fetch(
          `/api/editorials/${params.username}/${params.slug}`
        );

        if (response.ok) {
          const data = await response.json();
          setEditorial(data);

          // Check permissions
          const userCanEdit =
            user?.username === data.author.username || isAdmin;
          setCanEdit(userCanEdit);

          if (!userCanEdit) {
            toast({
              title: "Access Denied",
              description: "You don't have permission to edit this editorial.",
              variant: "destructive",
            });
            router.push(`/editorial/article/${params.username}/${params.slug}`);
          }
        } else {
          toast({
            title: "Editorial not found",
            description: "The editorial you're looking for doesn't exist.",
            variant: "destructive",
          });
          router.push("/editorial");
        }
      } catch (error) {
        console.error("Error fetching editorial:", error);
        toast({
          title: "Error",
          description: "Failed to load editorial. Please try again.",
          variant: "destructive",
        });
        router.push("/editorial");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEditorial();
  }, [
    isSignedIn,
    params.username,
    params.slug,
    user?.username,
    isAdmin,
    router,
    toast,
  ]);

  const handleSaveSuccess = (updatedEditorial: any) => {
    toast({
      title: "Editorial updated successfully!",
      description: "Your changes have been saved.",
    });
    router.push(
      `/editorial/article/${updatedEditorial.author.username}/${updatedEditorial.slug}`
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading editorial...</p>
        </div>
      </div>
    );
  }

  if (!editorial || !canEdit) {
    return null;
  }

  return (
    <EditorialForm
      mode="edit"
      initialData={{
        title: editorial.title,
        subtitle: editorial.subtitle,
        content: editorial.content,
        excerpt: editorial.excerpt,
        image: editorial.image,
        tags: editorial.tags,
        category: editorial.category,
        published: editorial.published,
        isStaffPicked: editorial.isStaffPicked,
      }}
      editorialId={editorial.id}
      username={params.username as string}
      slug={params.slug as string}
      onSaveSuccess={handleSaveSuccess}
    />
  );
}
