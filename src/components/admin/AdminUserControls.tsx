"use client";

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
import { Shield, ShieldOff, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminUserControlsProps {
  targetUser: {
    id: string;
    username: string;
    displayName?: string;
  };
  isCurrentlyAdmin: boolean;
}

export default function AdminUserControls({
  targetUser,
  isCurrentlyAdmin,
}: AdminUserControlsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAdminToggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/users/toggle-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: targetUser.id,
          makeAdmin: !isCurrentlyAdmin,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `User ${
            isCurrentlyAdmin ? "removed from" : "granted"
          } admin privileges`,
        });
        // Refresh the page to show updated status
        window.location.reload();
      } else {
        throw new Error("Failed to update admin status");
      }
    } catch (error) {
      console.error("Error toggling admin status:", error);
      toast({
        title: "Error",
        description: "Failed to update admin status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isCurrentlyAdmin ? "destructive" : "secondary"}
          size="sm"
          className="flex items-center gap-2"
        >
          {isCurrentlyAdmin ? (
            <>
              <ShieldOff className="h-4 w-4" />
              Remove Admin
            </>
          ) : (
            <>
              <Shield className="h-4 w-4" />
              Make Admin
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            {isCurrentlyAdmin
              ? "Remove Admin Privileges"
              : "Grant Admin Privileges"}
          </DialogTitle>
          <DialogDescription>
            {isCurrentlyAdmin ? (
              <>
                Are you sure you want to remove admin privileges from{" "}
                <strong>{targetUser.displayName || targetUser.username}</strong>
                ? This will revoke their ability to manage users, editorials,
                and other admin functions.
              </>
            ) : (
              <>
                Are you sure you want to grant admin privileges to{" "}
                <strong>{targetUser.displayName || targetUser.username}</strong>
                ? This will give them access to manage users, editorials, and
                other admin functions.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant={isCurrentlyAdmin ? "destructive" : "default"}
            onClick={handleAdminToggle}
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : isCurrentlyAdmin
              ? "Remove Admin"
              : "Grant Admin"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
