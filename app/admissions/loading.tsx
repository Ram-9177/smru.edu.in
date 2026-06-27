import React from "react";
import { FormSkeleton, HeroSkeleton } from "@/components/ui/Skeleton";

export default function AdmissionsLoading() {
  return (
    <div className="space-y-16">
      <HeroSkeleton />
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <FormSkeleton />
      </div>
    </div>
  );
}
