import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, StarOff, Shield, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminControlsProps {
  editorial: {
    id: string;
    slug: string;
    title: string;
    isStaffPicked: boolean;
    author: {
      username: string;
      displayName?: string;
    };
  };
  isAdmin: boolean;
  onEditorialUpdate?: () => void;
  onEditorialDelete?: () => void;
}

export function AdminControls({
  editorial,
  isAdmin,
  onEditorialUpdate,
  onEditorialDelete,
}: AdminControlsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();

  if (!isAdmin) return null;

  const toggleStaffPick = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `/api/admin/editorials/${editorial.author.username}/${editorial.slug}/staff-pick`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isStaffPicked: !editorial.isStaffPicked,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update staff pick status");
      }

      const data = await response.json();
      toast({
        title: "Success",
        description: data.message,
      });

      onEditorialUpdate?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update staff pick status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteEditorial = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/editorials/${editorial.author.username}/${editorial.slug}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete editorial");
      }

      toast({
        title: "Success",
        description: "Editorial deleted successfully",
      });

      onEditorialDelete?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete editorial",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">
            Admin Controls
          </span>
          {editorial.isStaffPicked && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Star className="h-3 w-3 mr-1" />
              Staff Pick
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleStaffPick}
            disabled={isUpdating}
            className="text-xs"
          >
            {editorial.isStaffPicked ? (
              <>
                <StarOff className="h-3 w-3 mr-1" />
                Remove Staff Pick
              </>
            ) : (
              <>
                <Star className="h-3 w-3 mr-1" />
                Add Staff Pick
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" asChild className="text-xs">
            <a
              href={`/editorial/edit/${editorial.author.username}/${editorial.slug}`}
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </a>
          </Button>

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Editorial</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{editorial.title}"? This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={deleteEditorial}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Editorial"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
