"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield, ShieldOff, Loader2 } from "lucide-react";
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

type BlockUserButtonProps = {
  userId: string;
  username: string;
  displayName?: string;
  variant?: "default" | "outline" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg";
  onBlockStatusChange?: (isBlocked: boolean) => void;
};

const BlockUserButton = ({
  userId,
  username,
  displayName,
  variant = "outline",
  size = "sm",
  onBlockStatusChange,
}: BlockUserButtonProps) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { toast } = useToast();

  const userDisplayName = displayName || username;

  // Check block status on mount
  useEffect(() => {
    const checkBlockStatus = async () => {
      try {
        const response = await fetch(`/api/user/blocked/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setIsBlocked(data.isBlocked);
        }
      } catch (error) {
        console.error("Error checking block status:", error);
      } finally {
        setIsChecking(false);
      }
    };

    if (userId) {
      checkBlockStatus();
    }
  }, [userId]);

  const handleBlock = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/block", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setIsBlocked(true);
        onBlockStatusChange?.(true);
        toast({
          title: "User blocked",
          description: `${userDisplayName} has been blocked. You won't see their content or receive messages from them.`,
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to block user");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to block user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblock = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/block", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setIsBlocked(false);
        onBlockStatusChange?.(false);
        toast({
          title: "User unblocked",
          description: `${userDisplayName} has been unblocked. You can now interact with them normally.`,
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
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <Button variant={variant} size={size} disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (isBlocked) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={variant}
            size={size}
            disabled={isLoading}
            className="text-green-600 hover:text-green-700"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <ShieldOff className="h-4 w-4 mr-2" />
            )}
            Unblock
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unblock {userDisplayName}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will allow {userDisplayName} to message you and see your
              content again. You will also be able to see their content and
              message them.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUnblock} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Unblocking...
                </>
              ) : (
                "Unblock"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={isLoading}
          className="text-red-600 hover:text-red-700"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Shield className="h-4 w-4 mr-2" />
          )}
          Block
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Block {userDisplayName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will prevent {userDisplayName} from messaging you and hide
            their content. They won't be notified that you've blocked them. You
            can unblock them at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleBlock}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Blocking...
              </>
            ) : (
              "Block User"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BlockUserButton;
