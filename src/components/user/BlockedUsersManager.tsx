"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, ShieldOff, User, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate, getProfileImageUrl } from "@/lib/utils";
import Spinner from "@/components/global/loader/spinner";
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

type BlockedUser = {
  id: string;
  blockedAt: string;
  user: {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    image?: string;
    createdAt: string;
  };
};

const BlockedUsersManager = () => {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unblockingUsers, setUnblockingUsers] = useState<Set<string>>(
    new Set()
  );
  const { toast } = useToast();

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const fetchBlockedUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/user/blocked");
      if (response.ok) {
        const data = await response.json();
        setBlockedUsers(data.blockedUsers);
      } else {
        throw new Error("Failed to fetch blocked users");
      }
    } catch (error) {
      console.error("Error fetching blocked users:", error);
      toast({
        title: "Error",
        description: "Failed to load blocked users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblock = async (userId: string, username: string) => {
    setUnblockingUsers((prev) => new Set(prev).add(userId));

    try {
      const response = await fetch("/api/user/block", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setBlockedUsers((prev) =>
          prev.filter((blocked) => blocked.user.id !== userId)
        );
        toast({
          title: "User unblocked",
          description: `${username} has been unblocked successfully.`,
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to unblock user");
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to unblock user",
        variant: "destructive",
      });
    } finally {
      setUnblockingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const getDisplayName = (user: BlockedUser["user"]) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.username;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Blocked Users
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Blocked Users
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage users you've blocked. Blocked users can't message you or see
          your content.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {blockedUsers.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No blocked users
            </h3>
            <p className="text-sm text-muted-foreground">
              Users you block will appear here. You can unblock them at any
              time.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {blockedUsers.map((blocked) => (
              <div
                key={blocked.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {" "}
                  <div className="relative">
                    {blocked.user.image ? (
                      <Image
                        src={getProfileImageUrl(blocked.user.image) || ""}
                        alt={getDisplayName(blocked.user)}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1">
                      <Shield className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/profile/${blocked.user.username}`}
                        className="font-medium hover:underline truncate"
                      >
                        {getDisplayName(blocked.user)}
                      </Link>
                      <Badge variant="secondary" className="text-xs">
                        @{blocked.user.username}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Blocked on {formatDate(blocked.blockedAt)}
                    </p>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={unblockingUsers.has(blocked.user.id)}
                      className="text-green-600 hover:text-green-700 border-green-600 hover:border-green-700"
                    >
                      {unblockingUsers.has(blocked.user.id) ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Unblocking...
                        </>
                      ) : (
                        <>
                          <ShieldOff className="h-4 w-4 mr-2" />
                          Unblock
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Unblock {getDisplayName(blocked.user)}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will allow {getDisplayName(blocked.user)} to
                        message you and see your content again. You will also be
                        able to see their content and message them.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleUnblock(
                            blocked.user.id,
                            getDisplayName(blocked.user)
                          )
                        }
                        disabled={unblockingUsers.has(blocked.user.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {unblockingUsers.has(blocked.user.id) ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Unblocking...
                          </>
                        ) : (
                          "Unblock User"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockedUsersManager;
