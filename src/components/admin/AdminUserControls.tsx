"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Shield,
  ShieldOff,
  Ban,
  UserX,
  AlertTriangle,
  MoreVertical,
  Trash2,
  Eye,
  EyeOff,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminUserControlsProps {
  targetUser: {
    id: string;
    username: string;
    displayName?: string;
    isAdmin: boolean;
    isBanned?: boolean;
    banReason?: string;
    bannedAt?: string;
    banExpiresAt?: string;
  };
}

export default function AdminUserControls({
  targetUser,
}: AdminUserControlsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showUnbanDialog, setShowUnbanDialog] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState("permanent");
  const [customDays, setCustomDays] = useState("");
  const { toast } = useToast();

  const handleAdminToggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/users/toggle-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: targetUser.id,
          makeAdmin: !targetUser.isAdmin,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `User ${
            targetUser.isAdmin ? "removed from" : "granted"
          } admin privileges`,
        });
        window.location.reload();
      } else {
        throw new Error("Failed to update admin status");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update admin status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowAdminDialog(false);
    }
  };

  const handleBanUser = async () => {
    if (!banReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for the ban",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      let expiresAt = null;
      if (banDuration !== "permanent") {
        const days =
          banDuration === "custom"
            ? parseInt(customDays)
            : parseInt(banDuration);
        if (isNaN(days) || days <= 0) {
          toast({
            title: "Error",
            description: "Please enter a valid number of days",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        expiresAt = new Date(
          Date.now() + days * 24 * 60 * 60 * 1000
        ).toISOString();
      }

      const response = await fetch("/api/admin/users/ban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: targetUser.id,
          reason: banReason,
          expiresAt,
        }),
      });

      if (response.ok) {
        toast({
          title: "User Banned",
          description: `${
            targetUser.displayName || targetUser.username
          } has been banned`,
        });
        window.location.reload();
      } else {
        throw new Error("Failed to ban user");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to ban user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowBanDialog(false);
    }
  };

  const handleUnbanUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/users/unban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: targetUser.id }),
      });

      if (response.ok) {
        toast({
          title: "User Unbanned",
          description: `${
            targetUser.displayName || targetUser.username
          } has been unbanned`,
        });
        window.location.reload();
      } else {
        throw new Error("Failed to unban user");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unban user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowUnbanDialog(false);
    }
  };

  const handleDeleteAllContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/users/delete-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: targetUser.id }),
      });

      if (response.ok) {
        toast({
          title: "Content Deleted",
          description: "All user content has been deleted",
        });
        window.location.reload();
      } else {
        throw new Error("Failed to delete content");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Admin Badge */}
      {targetUser.isAdmin && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Admin
        </Badge>
      )}

      {/* Ban Badge */}
      {targetUser.isBanned && (
        <Badge variant="destructive" className="flex items-center gap-1">
          <Ban className="h-3 w-3" />
          Banned
        </Badge>
      )}

      {/* Admin Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreVertical className="h-4 w-4" />
            Admin Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {/* Admin Controls */}
          <DropdownMenuItem onClick={() => setShowAdminDialog(true)}>
            {targetUser.isAdmin ? (
              <>
                <ShieldOff className="h-4 w-4 mr-2" />
                Remove Admin
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Make Admin
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Ban/Unban Controls */}
          {targetUser.isBanned ? (
            <DropdownMenuItem onClick={() => setShowUnbanDialog(true)}>
              <UserX className="h-4 w-4 mr-2" />
              Unban User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setShowBanDialog(true)}>
              <Ban className="h-4 w-4 mr-2" />
              Ban User
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          {/* Content Management */}
          <DropdownMenuItem
            onClick={handleDeleteAllContent}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete All Content
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Admin Toggle Dialog */}
      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              {targetUser.isAdmin
                ? "Remove Admin Privileges"
                : "Grant Admin Privileges"}
            </DialogTitle>
            <DialogDescription>
              {targetUser.isAdmin ? (
                <>
                  Are you sure you want to remove admin privileges from{" "}
                  <strong>
                    {targetUser.displayName || targetUser.username}
                  </strong>
                  ?
                </>
              ) : (
                <>
                  Are you sure you want to grant admin privileges to{" "}
                  <strong>
                    {targetUser.displayName || targetUser.username}
                  </strong>
                  ?
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdminDialog(false)}>
              Cancel
            </Button>
            <Button
              variant={targetUser.isAdmin ? "destructive" : "default"}
              onClick={handleAdminToggle}
              disabled={isLoading}
            >
              {isLoading
                ? "Processing..."
                : targetUser.isAdmin
                ? "Remove Admin"
                : "Grant Admin"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban User Dialog */}
      <Dialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-red-500" />
              Ban User
            </DialogTitle>
            <DialogDescription>
              Ban{" "}
              <strong>{targetUser.displayName || targetUser.username}</strong>{" "}
              from the platform
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="banReason">Reason for ban *</Label>
              <Textarea
                id="banReason"
                placeholder="Explain why this user is being banned..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="banDuration">Ban Duration</Label>
              <select
                id="banDuration"
                value={banDuration}
                onChange={(e) => setBanDuration(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="1">1 Day</option>
                <option value="3">3 Days</option>
                <option value="7">1 Week</option>
                <option value="30">1 Month</option>
                <option value="custom">Custom</option>
                <option value="permanent">Permanent</option>
              </select>
            </div>

            {banDuration === "custom" && (
              <div>
                <Label htmlFor="customDays">Number of Days</Label>
                <Input
                  id="customDays"
                  type="number"
                  placeholder="Enter number of days"
                  value={customDays}
                  onChange={(e) => setCustomDays(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBanDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBanUser}
              disabled={isLoading}
            >
              {isLoading ? "Banning..." : "Ban User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unban User Dialog */}
      <Dialog open={showUnbanDialog} onOpenChange={setShowUnbanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-green-500" />
              Unban User
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to unban{" "}
              <strong>{targetUser.displayName || targetUser.username}</strong>?
              {targetUser.banReason && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                  <strong>Original ban reason:</strong> {targetUser.banReason}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUnbanDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUnbanUser} disabled={isLoading}>
              {isLoading ? "Unbanning..." : "Unban User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
