"use client";
import { AppSidebar } from "@/components/app-sidebar";

export default function HomePage() {
  return (
    // <div className="flex min-h-screen w-full">
    //   <AppSidebar />
    <main className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance">Welcome back</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="font-semibold mb-2">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">
              Use the sidebar to navigate to different sections of the
              application.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="font-semibold mb-2">Getting Started</h3>
            <p className="text-sm text-muted-foreground">
              Browse restaurants, add items to your cart, and place orders
              through the navigation menu.
            </p>
          </div>
        </div>
      </div>
    </main>
    // </div>
  );
}
