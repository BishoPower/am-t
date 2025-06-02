import React from "react";
import { onAuthenticatedUser } from "@/actions/user";
import { getMessagesReceived, getMessagesSent, getTradeRequestsReceived, getTradeRequestsSent, getUserCloset, getUserData, getUserFavorites, getUserListings, getUserTradePreferences, verifyAccessToUser } from "@/actions/username";
import { redirect } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Sidebar from "@/components/global/sidebar";

// Fix the helper function to properly await the params
async function getUsername(params: { username: string }) {
  // First await the params object itself
  const resolvedParams = await Promise.resolve(params);
  // Then return the username property
  return resolvedParams.username;
}

// Static part that rarely changes
const DashboardLayoutStatic = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">{/* Static sidebar content */}</aside>
      <main>{children}</main>
    </div>
  );
};

// Dynamic wrapper with auth logic
export default async function Layout({
  params,
  children,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  // Get username through the helper function
  const username = await getUsername(params);

  // Authentication logic
  const auth = await onAuthenticatedUser();
  if (!auth.user?.username) {
    return redirect("/auth/sign-in");
  }

  // Verify access with the properly awaited username
  const access = await verifyAccessToUser(username);

  // Break potential redirect loops by checking if already on own dashboard
  if (access.status !== 200 && username !== auth.user.username) {
    return redirect(`/dashboard/${auth.user.username}`);
  }

  const query = new QueryClient();

  // Prefetch user data
  await query.prefetchQuery({
    queryKey: ["user", username],
    queryFn: () => getUserData(username),
  });

  // Prefetch user's listings
  await query.prefetchQuery({
    queryKey: ["listings", username],
    queryFn: () => getUserListings(username),
  });

  // Prefetch user's closet
  await query.prefetchQuery({
    queryKey: ["closet", username],
    queryFn: () => getUserCloset(username),
  });

  // Prefetch user's favorites
  await query.prefetchQuery({
    queryKey: ["favorites", username],
    queryFn: () => getUserFavorites(username),
  });

  // Prefetch user's messages (both sent and received)
  await query.prefetchQuery({
    queryKey: ["messages-received", username],
    queryFn: () => getMessagesReceived(username),
  });

  await query.prefetchQuery({ 
    queryKey: ["messages-sent", username],
    queryFn: () => getMessagesSent(username),
  });

  // Prefetch user's trade requests (both sent and received)
  await query.prefetchQuery({
    queryKey: ["trade-requests-sent", username],
    queryFn: () => getTradeRequestsSent(username),
  });

  await query.prefetchQuery({
    queryKey: ["trade-requests-received", username],
    queryFn: () => getTradeRequestsReceived(username),
  });

  // Prefetch user's trade preferences
  await query.prefetchQuery({
    queryKey: ["trade-preferences", username],
    queryFn: () => getUserTradePreferences(username),
  });

  // Return the layout with hydrated query client
  return (
    <HydrationBoundary state={dehydrate(query)}>
        <div className="flex h-screen w-screen">
            <Sidebar actionUsername={username} />
        </div>
    </HydrationBoundary>
  );
}
