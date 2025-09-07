"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  X,
  Plus,
  Upload,
  Eye,
  Image as ImageIcon,
  Bold,
  Italic,
  List,
  Quote,
  Link as LinkIcon,
  Type,
  Camera,
  ChevronLeft,
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsAdmin } from "@/hooks/use-admin";
import Image from "next/image";
import Link from "next/link";

type ContentSection = {
  id: string;
  type: "paragraph" | "heading" | "quote" | "list" | "image";
  content: string;
  imageUrl?: string;
  imageCaption?: string;
};

type InitialData = {
  title?: string;
  subtitle?: string;
  content?: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  category?: string;
  published?: boolean;
  isStaffPicked?: boolean;
};

type EditorialFormProps = {
  mode: "create" | "edit";
  initialData?: InitialData;
  editorialId?: string;
  username?: string;
  slug?: string;
  onSaveSuccess?: (editorial: any) => void;
};

export default function EditorialForm({
  mode,
  initialData,
  editorialId,
  username,
  slug,
  onSaveSuccess,
}: EditorialFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { isAdmin } = useIsAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    image: initialData?.image || "",
    tags: initialData?.tags || [],
    category: initialData?.category || "Guide",
    published: initialData?.published ?? true,
    isStaffPicked: initialData?.isStaffPicked || false,
  });

  const [currentTag, setCurrentTag] = useState("");
  const [contentSections, setContentSections] = useState<ContentSection[]>([
    { id: "1", type: "paragraph", content: "" },
  ]);
  const [featuredImage, setFeaturedImage] = useState<string>(
    initialData?.image || ""
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingSectionImages, setUploadingSectionImages] = useState<
    Set<string>
  >(new Set());
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Parse existing content into sections when in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData?.content) {
      parseContentIntoSections(initialData.content);
    }
  }, [mode, initialData?.content]);

  const parseContentIntoSections = (content: string) => {
    // Simple parsing logic - split by common patterns
    const sections: ContentSection[] = [];
    const lines = content.split("\n").filter((line) => line.trim());

    lines.forEach((line, index) => {
      const id = (index + 1).toString();

      if (line.startsWith("# ")) {
        sections.push({
          id,
          type: "heading",
          content: line.replace("# ", ""),
        });
      } else if (line.startsWith("> ")) {
        sections.push({
          id,
          type: "quote",
          content: line.replace("> ", ""),
        });
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        sections.push({
          id,
          type: "list",
          content: line.replace(/^[*-] /, ""),
        });
      } else if (line.includes("![") && line.includes("](")) {
        // Image markdown pattern
        const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (imageMatch) {
          sections.push({
            id,
            type: "image",
            content: "",
            imageUrl: imageMatch[2],
            imageCaption: imageMatch[1],
          });
        }
      } else if (line.trim()) {
        sections.push({
          id,
          type: "paragraph",
          content: line,
        });
      }
    });

    if (sections.length > 0) {
      setContentSections(sections);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadingImage(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("type", "editorial");

      const response = await fetch("/api/upload-file", {
        method: "POST",
        body: formDataUpload,
      });

      if (response.ok) {
        const { imageUrl } = await response.json();
        setFeaturedImage(imageUrl);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
        toast({
          title: "Image uploaded successfully!",
          description: "Your featured image has been set.",
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleContentImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    sectionId: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadingSectionImages((prev) => new Set([...prev, sectionId]));

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "editorial");

      const response = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        updateContentSection(sectionId, "imageUrl", result.url);
        toast({
          title: "Image uploaded successfully",
          description: "Your image has been uploaded.",
        });
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingSectionImages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(sectionId);
        return newSet;
      });
    }
  };

  const addContentSection = () => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      type: "paragraph",
      content: "",
    };
    setContentSections((prev) => [...prev, newSection]);
  };

  const removeContentSection = (id: string) => {
    if (contentSections.length > 1) {
      setContentSections((prev) => prev.filter((section) => section.id !== id));
    }
  };

  const updateContentSection = (
    id: string,
    field: keyof ContentSection,
    value: string
  ) => {
    setContentSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const moveContentSection = (id: string, direction: "up" | "down") => {
    setContentSections((prev) => {
      const index = prev.findIndex((section) => section.id === id);
      if (index === -1) return prev;

      const newSections = [...prev];
      if (direction === "up" && index > 0) {
        [newSections[index], newSections[index - 1]] = [
          newSections[index - 1],
          newSections[index],
        ];
      } else if (direction === "down" && index < newSections.length - 1) {
        [newSections[index], newSections[index + 1]] = [
          newSections[index + 1],
          newSections[index],
        ];
      }
      return newSections;
    });
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const generateContentFromSections = () => {
    return contentSections
      .map((section) => {
        switch (section.type) {
          case "heading":
            return `# ${section.content}`;
          case "quote":
            return `> ${section.content}`;
          case "list":
            return `- ${section.content}`;
          case "image":
            return section.imageUrl
              ? `![${section.imageCaption || ""}](${section.imageUrl})`
              : "";
          case "paragraph":
          default:
            return section.content;
        }
      })
      .filter((content) => content.trim())
      .join("\n\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your editorial.",
        variant: "destructive",
      });
      return;
    }

    if (
      contentSections.every((section) =>
        section.type === "image" ? !section.imageUrl : !section.content.trim()
      )
    ) {
      toast({
        title: "Content required",
        description: "Please add some content to your editorial.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const generatedContent = generateContentFromSections();

      const payload = {
        ...formData,
        content: generatedContent,
        excerpt:
          formData.excerpt ||
          contentSections
            .find((s) => s.type === "paragraph")
            ?.content.slice(0, 150) + "..." ||
          "Editorial content...",
        image: featuredImage,
      };

      let response;

      if (mode === "create") {
        response = await fetch("/api/editorials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`/api/editorials/${username}/${slug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const editorial = await response.json();
        toast({
          title:
            mode === "create"
              ? "Editorial created successfully!"
              : "Editorial updated successfully!",
          description:
            mode === "create"
              ? "Your editorial has been published and is now live."
              : "Your changes have been saved.",
        });

        if (onSaveSuccess) {
          onSaveSuccess(editorial);
        } else {
          router.push(
            `/editorial/article/${editorial.author.username}/${editorial.slug}`
          );
        }
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to save editorial");
      }
    } catch (error) {
      console.error("Error saving editorial:", error);
      toast({
        title:
          mode === "create"
            ? "Failed to create editorial"
            : "Failed to update editorial",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContentSection = (section: ContentSection, index: number) => {
    const isUploading = uploadingSectionImages.has(section.id);

    return (
      <Card key={section.id} className="relative">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">
                Section {index + 1}
              </span>
              <Badge variant="outline" className="text-xs">
                {section.type}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveContentSection(section.id, "up")}
                >
                  ↑
                </Button>
              )}
              {index < contentSections.length - 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveContentSection(section.id, "down")}
                >
                  ↓
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeContentSection(section.id)}
                disabled={contentSections.length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Section Type Selector */}
          <div>
            <Label className="text-sm font-medium">Content Type</Label>
            <div className="flex gap-2 mt-1">
              {[
                { type: "paragraph", icon: Type, label: "Paragraph" },
                { type: "heading", icon: Bold, label: "Heading" },
                { type: "quote", icon: Quote, label: "Quote" },
                { type: "list", icon: List, label: "List" },
                { type: "image", icon: ImageIcon, label: "Image" },
              ].map(({ type, icon: Icon, label }) => (
                <Button
                  key={type}
                  type="button"
                  variant={section.type === type ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    updateContentSection(section.id, "type", type as any)
                  }
                  className="flex items-center gap-1"
                >
                  <Icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Content Input */}
          {section.type === "image" ? (
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Image</Label>
                <div className="mt-1">
                  {section.imageUrl ? (
                    <div className="relative bg-white rounded-lg">
                      <Image
                        src={section.imageUrl}
                        alt="Content image"
                        width={400}
                        height={200}
                        className="rounded-lg object-contain max-w-full h-auto"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          updateContentSection(section.id, "imageUrl", "")
                        }
                        className="absolute top-2 right-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <Camera className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <Button
                            type="button"
                            variant="outline"
                            disabled={isUploading}
                            onClick={() => {
                              const input = document.createElement("input");
                              input.type = "file";
                              input.accept = "image/*";
                              input.onchange = (e) =>
                                handleContentImageUpload(e as any, section.id);
                              input.click();
                            }}
                          >
                            {isUploading ? "Uploading..." : "Upload Image"}
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label
                  htmlFor={`caption-${section.id}`}
                  className="text-sm font-medium"
                >
                  Caption (Optional)
                </Label>
                <Input
                  id={`caption-${section.id}`}
                  value={section.imageCaption || ""}
                  onChange={(e) =>
                    updateContentSection(
                      section.id,
                      "imageCaption",
                      e.target.value
                    )
                  }
                  placeholder="Add a caption for this image"
                  className="mt-1"
                />
              </div>
            </div>
          ) : (
            <div>
              <Label
                htmlFor={`content-${section.id}`}
                className="text-sm font-medium"
              >
                {section.type === "heading"
                  ? "Heading Text"
                  : section.type === "quote"
                  ? "Quote Text"
                  : section.type === "list"
                  ? "List Item"
                  : "Content"}
              </Label>
              <Textarea
                id={`content-${section.id}`}
                value={section.content}
                onChange={(e) =>
                  updateContentSection(section.id, "content", e.target.value)
                }
                placeholder={
                  section.type === "heading"
                    ? "Enter your heading..."
                    : section.type === "quote"
                    ? "Enter your quote..."
                    : section.type === "list"
                    ? "Enter list item..."
                    : "Enter your content..."
                }
                rows={section.type === "heading" ? 2 : 4}
                className="mt-1"
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/editorial">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Editorial
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">
                {mode === "create" ? "Create Editorial" : "Edit Editorial"}
              </h1>
              <p className="text-gray-600">
                {mode === "create"
                  ? "Share your knowledge and insights with the community"
                  : "Update your editorial content"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? "Edit" : "Preview"}
            </Button>
          </div>
        </div>

        {isPreview ? (
          <Card>
            <CardHeader>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{formData.title}</h1>
                {formData.subtitle && (
                  <p className="text-xl text-gray-600">{formData.subtitle}</p>
                )}
                {featuredImage && (
                  <div className="mt-4 bg-white rounded-lg p-2">
                    <Image
                      src={featuredImage}
                      alt={formData.title}
                      width={800}
                      height={400}
                      className="rounded-lg object-contain w-full"
                    />
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {contentSections.map((section, index) => (
                  <div key={section.id} className="mb-4">
                    {section.type === "heading" && (
                      <h2 className="text-2xl font-bold mb-2">
                        {section.content}
                      </h2>
                    )}
                    {section.type === "paragraph" && (
                      <p className="mb-4">{section.content}</p>
                    )}
                    {section.type === "quote" && (
                      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
                        {section.content}
                      </blockquote>
                    )}
                    {section.type === "list" && (
                      <ul className="list-disc list-inside mb-4">
                        <li>{section.content}</li>
                      </ul>
                    )}
                    {section.type === "image" && section.imageUrl && (
                      <div className="mb-4 bg-white rounded-lg p-2">
                        <Image
                          src={section.imageUrl}
                          alt={section.imageCaption || "Content image"}
                          width={600}
                          height={300}
                          className="rounded-lg object-contain w-full"
                        />
                        {section.imageCaption && (
                          <p className="text-sm text-gray-600 text-center mt-2">
                            {section.imageCaption}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter your editorial title"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) =>
                      handleInputChange("subtitle", e.target.value)
                    }
                    placeholder="Add a subtitle (optional)"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      handleInputChange("excerpt", e.target.value)
                    }
                    placeholder="Brief description of your editorial (optional)"
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Guide">Guide</option>
                    <option value="Review">Review</option>
                    <option value="News">News</option>
                    <option value="Opinion">Opinion</option>
                    <option value="Tutorial">Tutorial</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                {featuredImage ? (
                  <div className="relative bg-white rounded-lg p-2">
                    <Image
                      src={featuredImage}
                      alt="Featured image"
                      width={400}
                      height={200}
                      className="rounded-lg object-contain max-w-full h-auto"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setFeaturedImage("");
                        setFormData((prev) => ({ ...prev, image: "" }));
                      }}
                      className="absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={uploadingImage}
                          onClick={() => imageInputRef.current?.click()}
                        >
                          {uploadingImage
                            ? "Uploading..."
                            : "Upload Featured Image"}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Content Sections */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Content</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addContentSection}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {contentSections.map((section, index) =>
                  renderContentSection(section, index)
                )}
              </CardContent>
            </Card>

            {/* Tags and Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Tags & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs px-2 py-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="Add a tag and press Enter"
                      className="flex-1"
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      Add
                    </Button>
                  </div>
                </div>

                {/* Settings */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="published">Published</Label>
                      <p className="text-sm text-gray-500">
                        Make this editorial visible to the public
                      </p>
                    </div>
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, published: checked }))
                      }
                    />
                  </div>

                  {isAdmin && (
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="staffPicked">Staff Picked</Label>
                        <p className="text-sm text-gray-500">
                          Mark this as a staff-picked editorial
                        </p>
                      </div>
                      <Switch
                        id="staffPicked"
                        checked={formData.isStaffPicked}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            isStaffPicked: checked,
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting
                  ? mode === "create"
                    ? "Creating..."
                    : "Saving..."
                  : mode === "create"
                  ? "Create Editorial"
                  : "Save Changes"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
