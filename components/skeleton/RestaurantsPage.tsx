"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { AppSidebar } from "@/components/app-sidebar";

export function RestaurantsPageSkeleton() {
  return (
    // <div className="flex min-h-screen w-full">
    //   <AppSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" /> {/* Title */}
            <Skeleton className="h-4 w-80" /> {/* Subtitle */}
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 flex-1" /> {/* Search Input */}
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24" /> {/* Filter Button */}
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>

            {/* Results count */}
            <Skeleton className="h-6 w-40" />
          </div>

          {/* Restaurant Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 border rounded-lg space-y-4">
                <Skeleton className="h-32 w-full rounded-lg" /> {/* Image */}
                <Skeleton className="h-5 w-40" /> {/* Restaurant Name */}
                <Skeleton className="h-4 w-24" /> {/* Country/Tag */}
                <Skeleton className="h-4 w-32" /> {/* Description */}
              </div>
            ))}
          </div>
        </div>
      </main>
    // </div>
  );
}
