import type React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { getUserData } from "@/lib/get-user-data";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { userRole } = await getUserData();

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar userRole={userRole} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
