"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { UserPlus, Check, X, Users } from "lucide-react";

interface FriendRequestButtonProps {
  targetUsername: string;
  targetUserId: string;
  className?: string;
}

type FriendshipStatus =
  | "none"
  | "pending_sent"
  | "pending_received"
  | "friends";

export default function FriendRequestButton({
  targetUsername,
  targetUserId,
  className = "",
}: FriendRequestButtonProps) {
  const [status, setStatus] = useState<FriendshipStatus>("none");
  const [loading, setLoading] = useState(false);
  const [friendshipId, setFriendshipId] = useState<string | null>(null);

  useEffect(() => {
    checkFriendshipStatus();
  }, [targetUserId]);

  const checkFriendshipStatus = async () => {
    try {
      const response = await fetch("/api/friends?type=all");
      if (response.ok) {
        const data = await response.json();
        const friendship = data.friendships?.find(
          (f: any) =>
            (f.requester.username === targetUsername ||
              f.receiver.username === targetUsername) &&
            f.status !== "REJECTED"
        );

        if (friendship) {
          setFriendshipId(friendship.id);
          if (friendship.status === "ACCEPTED") {
            setStatus("friends");
          } else if (friendship.status === "PENDING") {
            // Check if current user sent or received the request
            if (friendship.requester.username === targetUsername) {
              setStatus("pending_received");
            } else {
              setStatus("pending_sent");
            }
          }
        } else {
          setStatus("none");
        }
      }
    } catch (error) {
      console.error("Error checking friendship status:", error);
    }
  };

  const sendFriendRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverUsername: targetUsername,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Friend request sent!",
        });
        setStatus("pending_sent");
        setFriendshipId(data.friendship.id);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send friend request",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send friend request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const respondToRequest = async (action: "accept" | "reject") => {
    if (!friendshipId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/friends/${friendshipId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Friend request ${action}ed!`,
        });
        if (action === "accept") {
          setStatus("friends");
        } else {
          setStatus("none");
          setFriendshipId(null);
        }
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error || `Failed to ${action} friend request`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} friend request`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFriend = async () => {
    if (!friendshipId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/friends/${friendshipId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Friend removed successfully",
        });
        setStatus("none");
        setFriendshipId(null);
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error || "Failed to remove friend",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove friend",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderButton = () => {
    switch (status) {
      case "friends":
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={removeFriend}
            disabled={loading}
            className={`text-green-600 border-green-600 hover:bg-green-50 ${className}`}
          >
            <Users className="h-4 w-4 mr-2" />
            {loading ? "Removing..." : "Friends"}
          </Button>
        );

      case "pending_sent":
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={removeFriend}
            disabled={loading}
            className={`text-yellow-600 border-yellow-600 hover:bg-yellow-50 ${className}`}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {loading ? "Canceling..." : "Request Sent"}
          </Button>
        );

      case "pending_received":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => respondToRequest("accept")}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => respondToRequest("reject")}
              disabled={loading}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-1" />
              Decline
            </Button>
          </div>
        );

      default:
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={sendFriendRequest}
            disabled={loading}
            className={className}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {loading ? "Sending..." : "Add Friend"}
          </Button>
        );
    }
  };

  return renderButton();
}
