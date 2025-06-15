"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { usePopup } from "@/components/ui/popup";
import { createPopupUtils } from "@/lib/popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Plus, Camera } from "lucide-react";
import Image from "next/image";

interface CreateListingProps {
  onSuccess?: () => void;
}

export default function CreateListing({ onSuccess }: CreateListingProps) {
  const router = useRouter();
  const { user } = useUser();
  const { showPopup } = usePopup();
  const popup = createPopupUtils(showPopup);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleImageUpload = async (files: FileList) => {
    if (images.length + files.length > 5) {
      popup.warning("You can only upload up to 5 images per listing");
      return;
    }

    setIsUploading(true);
    const newImages: File[] = [];
    const newUrls: string[] = [];

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
          newImages.push(file);
          newUrls.push(imageUrl);
        } else {
          popup.error(`Failed to upload ${file.name}`);
        }
      }

      setImages((prev) => [...prev, ...newImages]);
      setImageUrls((prev) => [...prev, ...newUrls]);

      if (newImages.length > 0) {
        popup.success(`${newImages.length} image(s) uploaded successfully`);
      }
    } catch (error) {
      popup.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || imageUrls.length === 0) {
      popup.error(
        "Please fill in all required fields and upload at least one image"
      );
      return;
    }

    setIsCreating(true);

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
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
        const listing = await response.json();
        popup.success("Listing created successfully!");

        // Reset form
        setTitle("");
        setDescription("");
        setImages([]);
        setImageUrls([]);
        setTags([]);
        setIsPrivate(false);

        if (onSuccess) {
          onSuccess();
        } else {
          router.push(`/profile/${user?.username}`);
        }
      } else {
        const error = await response.json();
        popup.error(error.error || "Failed to create listing");
      }
    } catch (error) {
      popup.error("Failed to create listing");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader className="bg-white border-b border-gray-200 px-8 py-6">
            <CardTitle className="text-4xl font-bold text-black">
              Create New Listing
            </CardTitle>
            <p className="text-gray-600 text-xl mt-2">
              Share an item from your closet with the community
            </p>
          </CardHeader>
          <CardContent className="bg-white px-8 py-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Basic Info */}
                <div className="space-y-8">
                  {/* Title */}
                  <div>
                    <label className="block text-lg font-medium text-black mb-4">
                      Title *
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="What are you sharing?"
                      maxLength={100}
                      className="border-gray-300 focus:border-black focus:ring-black text-lg py-4 h-14"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {title.length}/100
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-lg font-medium text-black mb-4">
                      Description *
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your item... (size, condition, style, etc.)"
                      maxLength={1000}
                      rows={12}
                      className="border-gray-300 focus:border-black focus:ring-black text-base"
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
                    </label>

                    {/* Upload Area */}
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
                        disabled={isUploading || images.length >= 5}
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Camera className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                        <p className="text-2xl text-gray-600 mb-4">
                          {isUploading
                            ? "Uploading..."
                            : "Click to upload photos"}
                        </p>
                        <p className="text-lg text-gray-500">
                          PNG, JPG up to 5MB each • Maximum 5 photos
                        </p>
                      </label>
                    </div>

                    {/* Image Previews */}
                    {imageUrls.length > 0 && (
                      <div className="grid grid-cols-2 gap-6 mt-8">
                        {imageUrls.map((url, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={url}
                              alt={`Upload ${index + 1}`}
                              width={300}
                              height={300}
                              className="w-full h-56 object-cover rounded-lg border border-gray-300 shadow-md"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
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
                  onClick={() => router.back()}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-4 text-lg h-14"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || isUploading}
                  className="flex-1 bg-black text-white hover:bg-gray-800 py-4 text-lg h-14"
                >
                  {isCreating ? "Creating..." : "Create Listing"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
