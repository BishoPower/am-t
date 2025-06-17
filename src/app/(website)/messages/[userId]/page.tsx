"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, User, Clock } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { formatChatTime } from "@/lib/utils";
import Spinner from "@/components/global/loader/spinner";

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

type User = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  image?: string;
};

export default function MessageConversationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userId } = useAuth();
  const { toast } = useToast();

  const otherUserId = params.userId as string;
  const listingId = searchParams.get("listing");
  const listingTitle = searchParams.get("title");

  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (otherUserId) {
      fetchMessages();
      fetchOtherUser();
    }
  }, [otherUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchOtherUser = async () => {
    try {
      const response = await fetch(`/api/user/${otherUserId}`);
      if (response.ok) {
        const userData = await response.json();
        setOtherUser(userData);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/messages/${otherUserId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
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
  };

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
          toId: otherUserId,
          content: newMessage.trim(),
          listingId: listingId || null,
        }),
      });

      if (response.ok) {
        const newMsg = await response.json();
        setMessages((prev) => [...prev, newMsg]);
        setNewMessage("");
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
  if (!otherUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size={32} color="#000000" />
      </div>
    );
  }

  const displayName =
    otherUser.firstName && otherUser.lastName
      ? `${otherUser.firstName} ${otherUser.lastName}`
      : otherUser.username;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-200">
            {otherUser.image ? (
              <Image
                src={otherUser.image}
                alt={displayName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                <User className="h-5 w-5" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {displayName}
            </h1>
            <p className="text-sm text-gray-600">@{otherUser.username}</p>
          </div>
        </div>

        {listingTitle && (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-700 ml-auto"
          >
            Re: {listingTitle}
          </Badge>
        )}
      </div>{" "}
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Spinner size={32} color="#000000" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <User className="h-8 w-8 mb-2" />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isFromMe = message.fromId === userId;
            return (
              <div
                key={message.id}
                className={`flex ${isFromMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-3 ${
                    isFromMe
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-900 border border-gray-200 shadow-sm"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div
                    className={`flex items-center gap-1 mt-1 text-xs ${
                      isFromMe ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    {formatChatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border-gray-300 focus:border-gray-800 focus:ring-gray-800"
            disabled={isSending}
          />
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim() || isSending}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6"
          >
            {" "}
            {isSending ? (
              <Spinner size={16} color="#ffffff" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
