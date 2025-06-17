"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, User, Clock, Trash2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/components/global/loader/spinner";
import { formatMessageTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import MessageModal from "./MessageModal";

type Conversation = {
  id: string;
  otherUser: {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    image?: string;
  };
  lastMessage: {
    id: string;
    content: string;
    timestamp: string;
    fromId: string;
  };
  unreadCount: number;
  listing?: {
    id: string;
    title: string;
    imageUrls: string[];
  };
};

type MessagesInboxProps = {
  onMessagesRead?: () => void;
};

const MessagesInbox = ({ onMessagesRead }: MessagesInboxProps) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchConversations();
    }
  }, [userId]);
  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/messages/conversations");
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      } else {
        const errorText = await response.text();
        console.error(
          "Failed to fetch conversations:",
          response.status,
          errorText
        );
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const openConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsMessageModalOpen(true);
  };
  const closeModal = () => {
    setIsMessageModalOpen(false);
    setSelectedConversation(null);
    // Refresh conversations to update unread counts when modal closes
    fetchConversations();
    // Also refresh the parent's unread count
    if (onMessagesRead) {
      onMessagesRead();
    }
  };

  const deleteConversation = async (
    conversationId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `/api/messages/conversations/${conversationId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setConversations((prev) =>
          prev.filter((conv) => conv.id !== conversationId)
        );
        toast({
          title: "Conversation deleted",
          description: "The conversation has been removed from your inbox.",
        });
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      });
    }
  };
  const ConversationCard = ({
    conversation,
  }: {
    conversation: Conversation;
  }) => {
    const isSystemUser = conversation.otherUser.username === "am-t-system";
    const displayName = isSystemUser
      ? "AM-T System"
      : conversation.otherUser.firstName && conversation.otherUser.lastName
      ? `${conversation.otherUser.firstName} ${conversation.otherUser.lastName}`
      : conversation.otherUser.username;

    const isUnread =
      conversation.lastMessage.fromId !== userId &&
      conversation.unreadCount > 0;

    return (
      <Card
        className={`cursor-pointer transition-colors hover:bg-gray-50 ${
          isUnread ? "border-gray-800 bg-gray-50" : "border-gray-200"
        }`}
        onClick={() => openConversation(conversation)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {" "}
            <div
              className={`w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0 ${
                isSystemUser ? "bg-primary" : "bg-gray-200"
              }`}
            >
              {isSystemUser ? (
                <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground">
                  <span className="text-sm font-bold">AM-T</span>
                </div>
              ) : conversation.otherUser.image ? (
                <Image
                  src={conversation.otherUser.image}
                  alt={displayName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                  <User className="h-6 w-6" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3
                  className={`font-medium truncate ${
                    isUnread ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {displayName}
                </h3>{" "}
                <div className="flex items-center gap-2">
                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                    onClick={(e) => deleteConversation(conversation.id, e)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>{" "}
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm text-gray-600">
                  @{conversation.otherUser.username}
                </p>
                {isSystemUser && (
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    OFFICIAL
                  </Badge>
                )}
              </div>
              {conversation.listing && (
                <p className="text-xs text-gray-500 mb-2 truncate">
                  Re: {conversation.listing.title}
                </p>
              )}
              <p
                className={`text-sm truncate ${
                  isUnread ? "font-medium text-gray-900" : "text-gray-600"
                }`}
              >
                {conversation.lastMessage.content}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {formatMessageTime(conversation.lastMessage.timestamp)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size={32} color="#000000" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-6 w-6 text-gray-800" />
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        {conversations.length > 0 && (
          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
            {conversations.length} conversation
            {conversations.length !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>
      {conversations.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No messages yet
            </h3>
            <p className="text-gray-600">
              Start conversations by messaging other users about their listings.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {conversations.map((conversation) => (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
            />
          ))}
        </div>
      )}{" "}
      {/* Message Modal */}
      {selectedConversation && (
        <MessageModal
          isOpen={isMessageModalOpen}
          onClose={closeModal}
          otherUser={selectedConversation.otherUser}
          listingId={selectedConversation.listing?.id}
          listingTitle={selectedConversation.listing?.title}
        />
      )}
    </div>
  );
};

export default MessagesInbox;
