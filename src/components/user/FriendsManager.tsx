"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { UserPlus, Check, X, UserMinus } from "lucide-react";

interface Friend {
  id: string;
  username: string;
  displayName: string | null;
  image: string | null;
}

interface Friendship {
  id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  requester: Friend;
  receiver: Friend;
  createdAt: string;
}

export default function FriendsManager() {
  const [friendUsername, setFriendUsername] = useState("");
  const [friends, setFriends] = useState<Friendship[]>([]);
  const [sentRequests, setSentRequests] = useState<Friendship[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<Friendship[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("friends");

  useEffect(() => {
    loadFriends();
    loadSentRequests();
    loadReceivedRequests();
  }, []);

  const loadFriends = async () => {
    try {
      const response = await fetch("/api/friends?type=friends");
      if (response.ok) {
        const data = await response.json();
        setFriends(data.friendships || []);
      }
    } catch (error) {
      console.error("Error loading friends:", error);
    }
  };

  const loadSentRequests = async () => {
    try {
      const response = await fetch("/api/friends?type=sent");
      if (response.ok) {
        const data = await response.json();
        setSentRequests(data.friendships || []);
      }
    } catch (error) {
      console.error("Error loading sent requests:", error);
    }
  };

  const loadReceivedRequests = async () => {
    try {
      const response = await fetch("/api/friends?type=received");
      if (response.ok) {
        const data = await response.json();
        setReceivedRequests(data.friendships || []);
      }
    } catch (error) {
      console.error("Error loading received requests:", error);
    }
  };

  const sendFriendRequest = async () => {
    if (!friendUsername.trim()) {
      toast({
        title: "Error",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverUsername: friendUsername.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Friend request sent!",
        });
        setFriendUsername("");
        loadSentRequests();
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

  const respondToRequest = async (
    friendshipId: string,
    action: "accept" | "reject"
  ) => {
    try {
      const response = await fetch(`/api/friends/${friendshipId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: `Friend request ${action}ed!`,
        });
        loadReceivedRequests();
        if (action === "accept") {
          loadFriends();
        }
      } else {
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
    }
  };

  const removeFriend = async (friendshipId: string) => {
    try {
      const response = await fetch(`/api/friends/${friendshipId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Friend removed successfully",
        });
        loadFriends();
        loadSentRequests();
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
    }
  };

  const getFriendUser = (friendship: Friendship, currentUserId: string) => {
    return friendship.requester.id === currentUserId
      ? friendship.receiver
      : friendship.requester;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add Friend
          </CardTitle>
          <CardDescription>
            Send a friend request by entering their username
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter username..."
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendFriendRequest()}
              disabled={loading}
            />
            <Button onClick={sendFriendRequest} disabled={loading}>
              {loading ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger>
          <TabsTrigger value="received">
            Requests ({receivedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="sent">Sent ({sentRequests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Friends</CardTitle>
              <CardDescription>People you're connected with</CardDescription>
            </CardHeader>
            <CardContent>
              {friends.length === 0 ? (
                <p className="text-muted-foreground">
                  No friends yet. Send some friend requests!
                </p>
              ) : (
                <div className="space-y-3">
                  {friends.map((friendship) => {
                    const friend =
                      friendship.requester.id !== friendship.receiver.id
                        ? friendship.requester.username
                          ? friendship.receiver
                          : friendship.requester
                        : friendship.receiver;

                    return (
                      <div
                        key={friendship.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={friend.image || undefined} />
                            <AvatarFallback>
                              {(friend.displayName || friend.username)
                                .charAt(0)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {friend.displayName || friend.username}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              @{friend.username}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFriend(friendship.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <UserMinus className="h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="received" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Friend Requests</CardTitle>
              <CardDescription>
                People who want to be your friend
              </CardDescription>
            </CardHeader>
            <CardContent>
              {receivedRequests.length === 0 ? (
                <p className="text-muted-foreground">
                  No pending friend requests
                </p>
              ) : (
                <div className="space-y-3">
                  {receivedRequests.map((friendship) => (
                    <div
                      key={friendship.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={friendship.requester.image || undefined}
                          />
                          <AvatarFallback>
                            {(
                              friendship.requester.displayName ||
                              friendship.requester.username
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {friendship.requester.displayName ||
                              friendship.requester.username}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            @{friendship.requester.username}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            respondToRequest(friendship.id, "accept")
                          }
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4" />
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            respondToRequest(friendship.id, "reject")
                          }
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sent Requests</CardTitle>
              <CardDescription>
                Friend requests you've sent that are pending
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sentRequests.length === 0 ? (
                <p className="text-muted-foreground">
                  No pending sent requests
                </p>
              ) : (
                <div className="space-y-3">
                  {sentRequests.map((friendship) => (
                    <div
                      key={friendship.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={friendship.receiver.image || undefined}
                          />
                          <AvatarFallback>
                            {(
                              friendship.receiver.displayName ||
                              friendship.receiver.username
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {friendship.receiver.displayName ||
                              friendship.receiver.username}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            @{friendship.receiver.username}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Pending</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFriend(friendship.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
