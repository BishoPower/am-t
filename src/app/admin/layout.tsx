import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

async function checkAdminAccess() {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const dbUser = await client.user.findUnique({
    where: { clerkid: user.id },
    select: { isAdmin: true },
  });

  if (!dbUser?.isAdmin) {
    redirect("/");
  }

  return true;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAdminAccess();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Manage users and platform content
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Admin Panel
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
