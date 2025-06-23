"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { usePopup } from "@/components/ui/popup";
import { createPopupUtils } from "@/lib/popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/global/loader/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Plus, Camera, Trash2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DraggableImageProps {
  url: string;
  index: number;
  onRemove: (index: number) => void;
}

const DraggableImage: React.FC<DraggableImageProps> = ({
  url,
  index,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url }); // Use URL as stable ID

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group"
      {...attributes}
      {...listeners}
    >
      <div className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded">
        {index + 1}
      </div>
      <Image
        src={url}
        alt={`Image ${index + 1}`}
        width={300}
        height={300}
        className="w-full h-56 object-cover rounded-lg border border-gray-300 shadow-md select-none"
        draggable={false}
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg z-20"
      >
        <X className="h-4 w-4" />
      </button>
      {isDragging && (
        <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500 border-dashed rounded-lg flex items-center justify-center">
          <span className="text-blue-700 font-medium">Moving...</span>
        </div>
      )}
    </div>
  );
};

interface EditListingProps {
  listingId: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  isPrivate: boolean;
  tags: { name: string }[];
  user: {
    id: string;
    username: string;
    image: string;
  };
}

export default function EditListing({ listingId }: EditListingProps) {
  const router = useRouter();
  const { user } = useUser();
  const { showPopup } = usePopup();
  const popup = createPopupUtils(showPopup);

  // Form states
  const [listing, setListing] = useState<Listing | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(false); // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeUrl = active.id as string;
      const overUrl = over.id as string;

      const activeIndex = imageUrls.findIndex((url) => url === activeUrl);
      const overIndex = imageUrls.findIndex((url) => url === overUrl);

      if (activeIndex !== -1 && overIndex !== -1) {
        // Reorder imageUrls array
        setImageUrls((items) => arrayMove(items, activeIndex, overIndex));
      }
    }
  }; // Load listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listings/${listingId}`);
        if (response.ok) {
          const listingData = await response.json();
          setListing(listingData);
          setTitle(listingData.title);
          setDescription(listingData.description);
          setImageUrls(listingData.imageUrls);
          setTags(listingData.tags.map((tag: { name: string }) => tag.name));
          setIsPrivate(listingData.isPrivate);
        } else {
          popup.error("Failed to load listing");
          router.push("/profile");
        }
      } catch (error) {
        popup.error("Failed to load listing");
        router.push("/profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [listingId]); // Only depend on listingId// Check if user owns the listing
  useEffect(() => {
    if (listing && user) {
      // Only check permission after both listing and user are loaded
      if (listing.user.username !== user.username) {
        popup.error("You don't have permission to edit this listing");
        router.push(`/listing/${listingId}`);
        return;
      }
    }
  }, [listing, user, listingId]); // Remove router and popup from dependencies

  const handleImageUpload = async (files: FileList) => {
    const totalImages = imageUrls.length + newImages.length + files.length;

    if (totalImages > 5) {
      popup.warning("You can only have up to 5 images per listing");
      return;
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith("image/")) {
          popup.error(`${file.name} is not a valid image file`);
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          // 5MB limit
          popup.error(`${file.name} is too large. Maximum size is 5MB`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const { imageUrl } = await response.json();
          uploadedUrls.push(imageUrl);
        } else {
          popup.error(`Failed to upload ${file.name}`);
        }
      }

      if (uploadedUrls.length > 0) {
        setImageUrls((prev) => [...prev, ...uploadedUrls]);
        popup.success(`${uploadedUrls.length} image(s) uploaded successfully`);
      }
    } catch (error) {
      popup.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < 10) {
      setTags((prev) => [...prev, tag]);
      setTagInput("");
    } else if (tags.length >= 10) {
      popup.warning("You can add up to 10 tags per listing");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || imageUrls.length === 0) {
      popup.error(
        "Please fill in all required fields and upload at least one image"
      );
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          imageUrls,
          tags,
          isPrivate,
        }),
      });
      if (response.ok) {
        popup.success("Listing updated successfully!");
        // Add a small delay before navigation to let user see the success message
        setTimeout(() => {
          router.push(`/listing/${listingId}`);
        }, 1000);
      } else {
        const error = await response.json();
        popup.error(error.error || "Failed to update listing");
      }
    } catch (error) {
      popup.error("Failed to update listing");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        popup.success("Listing deleted successfully!");
        router.push(`/profile/${user?.username}`);
      } else {
        const error = await response.json();
        popup.error(error.error || "Failed to delete listing");
      }
    } catch (error) {
      popup.error("Failed to delete listing");
    } finally {
      setIsDeleting(false);
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size={128} color="#000000" />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Listing not found</p>
        </div>
      </div>
    );
  } // Don't render the form until we have both listing and user data
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size={128} color="#000000" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/listing/${listingId}`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Listing
            </Button>
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-4xl font-bold text-black">
                  Edit Listing
                </CardTitle>
                <p className="text-gray-600 text-xl mt-2">
                  Update your listing details
                </p>
              </div>

              {/* Delete Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Listing
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this listing? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>

          <CardContent className="bg-white px-8 py-8">
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Basic Info */}
                <div className="space-y-8">
                  {/* Title */}
                  <div>
                    <label className="block text-lg font-medium text-black mb-4">
                      Title *
                    </label>{" "}
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="What are you sharing?"
                      maxLength={100}
                      className="border-gray-300 focus:border-black focus:ring-black text-lg py-4 h-14"
                      disabled={isLoading || isSaving}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {title.length}/100
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-lg font-medium text-black mb-4">
                      Description *
                    </label>{" "}
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your item... (size, condition, style, etc.)"
                      maxLength={1000}
                      rows={12}
                      className="border-gray-300 focus:border-black focus:ring-black text-base"
                      disabled={isLoading || isSaving}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {description.length}/1000
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-lg font-medium text-black mb-4">
                      Tags (optional)
                    </label>
                    <div className="flex gap-3 mb-4">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tags (e.g., vintage, summer, dress)..."
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTag())
                        }
                        className="border-gray-300 focus:border-black focus:ring-black text-base h-12"
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-white px-6 h-12"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      {tags.length}/10 tags
                    </p>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-gray-100 text-black hover:bg-gray-200 px-3 py-2 text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-2 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Privacy */}
                  <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="private"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <label htmlFor="private" className="text-lg text-gray-700">
                      Make this listing private (only visible to you)
                    </label>
                  </div>
                </div>

                {/* Right Column - Images */}
                <div className="space-y-8">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-lg font-medium text-black mb-4">
                      Photos * (up to 5)
                    </label>{" "}
                    {/* Current Images */}
                    {imageUrls.length > 0 && (
                      <div className="mb-8">
                        {" "}
                        <p className="text-sm text-gray-600 mb-4">
                          Tap and drag images to reorder them. The first image
                          will be the main preview.
                        </p>
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={handleDragEnd}
                        >
                          {" "}
                          <SortableContext
                            items={imageUrls}
                            strategy={rectSortingStrategy}
                          >
                            <div className="grid grid-cols-2 gap-6">
                              {imageUrls.map((url, index) => (
                                <DraggableImage
                                  key={url}
                                  url={url}
                                  index={index}
                                  onRemove={removeImage}
                                />
                              ))}
                            </div>
                          </SortableContext>
                        </DndContext>
                      </div>
                    )}
                    {/* Upload Area */}
                    {imageUrls.length < 5 && (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-black transition-colors min-h-[300px] flex flex-col justify-center">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) =>
                            e.target.files && handleImageUpload(e.target.files)
                          }
                          className="hidden"
                          id="image-upload"
                          disabled={isUploading || imageUrls.length >= 5}
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <Camera className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                          <p className="text-2xl text-gray-600 mb-4">
                            {isUploading
                              ? "Uploading..."
                              : "Click to add more photos"}
                          </p>
                          <p className="text-lg text-gray-500">
                            PNG, JPG up to 5MB each • {5 - imageUrls.length}{" "}
                            remaining
                          </p>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Buttons - Full Width */}
              <div className="flex gap-6 pt-12 mt-12 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/listing/${listingId}`)}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-4 text-lg h-14"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="flex-1 bg-black text-white hover:bg-gray-800 py-4 text-lg h-14"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
