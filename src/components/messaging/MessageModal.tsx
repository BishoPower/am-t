"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/global/loader/spinner";
import { Badge } from "@/components/ui/badge";
import { X, Send, User, Clock } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { formatMessageTime } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  timestamp: string;
  fromId: string;
  toId: string;
  from: {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    image?: string;
  };
  listing?: {
    id: string;
    title: string;
    imageUrls: string[];
  };
};

type MessageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  otherUser: {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    image?: string;
  };
  listingId?: string;
  listingTitle?: string;
};

const MessageModal = ({
  isOpen,
  onClose,
  otherUser,
  listingId,
  listingTitle,
}: MessageModalProps) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [currentUserDbId, setCurrentUserDbId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Wrapped onClose to refresh navbar count
  const handleClose = useCallback(() => {
    // Refresh navbar unread count when modal closes
    if (typeof window !== 'undefined' && (window as any).refreshNavUnreadCount) {
      (window as any).refreshNavUnreadCount();
    }
    onClose();
  }, [onClose]);

  // Fetch current user's database ID
  const fetchCurrentUserDbId = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/profile?clerkId=${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setCurrentUserDbId(userData.id);
      }
    } catch (error) {
      console.error("Failed to fetch current user data:", error);
    }
  }, [userId]);
  // Mark messages as read when modal opens
  const markMessagesAsRead = useCallback(async () => {
    if (!otherUser?.id) return;

    try {
      await fetch(`/api/messages/${otherUser.id}/read`, {
        method: "PATCH",
      });
      // Refresh navbar unread count
      if (typeof window !== 'undefined' && (window as any).refreshNavUnreadCount) {
        (window as any).refreshNavUnreadCount();
      }
      // Don't call onMessagesRead here to avoid infinite loop
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  }, [otherUser?.id]);
  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!otherUser.id) {
        throw new Error("Other user ID is missing");
      }

      const response = await fetch(`/api/messages/${otherUser.id}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        const errorText = await response.text();
        console.error("Response error:", response.status, errorText);
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [otherUser.id, toast]);
  useEffect(() => {
    if (isOpen && userId) {
      fetchCurrentUserDbId();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (isOpen && otherUser.id && currentUserDbId) {
      fetchMessages();
      markMessagesAsRead();
    }
  }, [isOpen, otherUser.id, currentUserDbId]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    try {
      setIsSending(true);
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toId: otherUser.id,
          content: newMessage.trim(),
          listingId: listingId || null,
        }),
      });
      if (response.ok) {
        const newMsg = await response.json();
        setMessages((prev) => [...prev, newMsg]);
        setNewMessage("");
        toast({
          title: "Message sent!",
          description:
            "Your message has been sent. Check your profile Messages tab to continue the conversation.",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isSystemUser = otherUser.username === "am-t-system";
  const displayName = isSystemUser
    ? "AM-T System"
    : otherUser.firstName && otherUser.lastName
    ? `${otherUser.firstName} ${otherUser.lastName}`
    : otherUser.username;
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 flex flex-col">
        {" "}
        {/* Header */}
        <DialogHeader className="p-4 border-b border-border bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {" "}
              <div
                className={`w-10 h-10 relative rounded-full overflow-hidden ${
                  isSystemUser ? "bg-primary" : "bg-muted"
                }`}
              >
                {isSystemUser ? (
                  <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">AM-T</span>
                  </div>
                ) : otherUser.image ? (
                  <Image
                    src={otherUser.image}
                    alt={displayName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>{" "}
              <div>
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-lg font-semibold text-foreground">
                    {displayName}
                  </DialogTitle>
                  {isSystemUser && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      OFFICIAL
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  @{otherUser.username}
                </p>
              </div>
            </div>
            {listingTitle && (
              <Badge
                variant="outline"
                className="bg-muted text-muted-foreground mt-7"
              >
                Re: {listingTitle}
              </Badge>
            )}
          </div>
        </DialogHeader>{" "}
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[500px]">
          {isLoading || !currentUserDbId ? (
            <div className="flex items-center justify-center h-32">
              <Spinner size={32} color="hsl(var(--foreground))" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <User className="h-8 w-8 mb-2" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              // Compare message.fromId with the current user's database ID
              const isFromMe =
                currentUserDbId &&
                String(message.fromId) === String(currentUserDbId);
              const senderName = isFromMe
                ? "You"
                : message.from.firstName && message.from.lastName
                ? `${message.from.firstName} ${message.from.lastName}`
                : message.from.username;

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isFromMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] ${
                      isFromMe ? "text-right" : "text-left"
                    }`}
                  >
                    {" "}
                    {/* Username */}
                    <div
                      className={`text-xs text-muted-foreground mb-1 px-1 ${
                        isFromMe ? "text-right" : "text-left"
                      }`}
                    >
                      {senderName}
                    </div>
                    {/* Message Bubble */}{" "}
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        isFromMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      <div className="text-sm">
                        <MessageContent content={message.content} />
                      </div>
                      <div
                        className={`flex items-center gap-1 mt-1 text-xs ${
                          isFromMe
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground/70"
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        {formatMessageTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>{" "}
        {/* Message Input */}
        {!isSystemUser ? (
          <div className="p-4 border-t border-border bg-muted/50">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border-border focus:border-ring focus:ring-ring"
                disabled={isSending}
              />{" "}
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || isSending}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
              >
                {isSending ? (
                  <Spinner size={16} color="#ffffff" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 border-t border-border bg-muted/50">
            <p className="text-sm text-muted-foreground text-center">
              This is an automated system account. You cannot send messages to
              this account.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Component to render message content with markdown support for images
const MessageContent = ({ content }: { content: string }) => {
  // Parse markdown images and convert to JSX
  const renderContentWithImages = (text: string) => {
    // Split by image markdown pattern
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = imageRegex.exec(text)) !== null) {
      // Add text before the image
      if (match.index > lastIndex) {
        const textPart = text.slice(lastIndex, match.index);
        if (textPart.trim()) {
          parts.push(
            <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
              {textPart}
            </span>
          );
        }
      }

      // Add the image
      const [, alt, src] = match;
      parts.push(
        <div key={`img-${match.index}`} className="my-2">
          <Image
            src={src}
            alt={alt || "Trade item"}
            width={200}
            height={200}
            className="rounded-lg object-cover max-w-[200px] max-h-[200px]"
            onError={(e) => {
              // Hide broken images
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      if (remainingText.trim()) {
        parts.push(
          <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
            {remainingText}
          </span>
        );
      }
    }

    // If no images found, just return the text
    if (parts.length === 0) {
      return <span className="whitespace-pre-wrap">{text}</span>;
    }

    return <div className="space-y-1">{parts}</div>;
  };

  return renderContentWithImages(content);
};

export default MessageModal;
