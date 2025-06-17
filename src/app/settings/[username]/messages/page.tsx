import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MessagesInbox from "@/components/messaging/MessagesInbox";

export default async function MessagesPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-1">
          View and manage your conversations with other users.
        </p>
      </div>

      <MessagesInbox />
    </div>
  );
}
