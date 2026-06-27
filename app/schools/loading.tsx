import React from "react";
import { CardSkeleton } from "@/components/ui/Skeleton";

export default function SchoolsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      <div className="space-y-4 text-center">
        <div className="h-12 w-1/3 bg-slate-100 mx-auto animate-pulse rounded-lg" />
        <div className="h-6 w-1/4 bg-slate-100 mx-auto animate-pulse rounded-md" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
