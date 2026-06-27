"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "rect" | "circle" | "text";
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", variant = "rect" }) => {
  const baseClasses = "relative overflow-hidden bg-slate-200/60";
  const variantClasses = {
    rect: "rounded-lg",
    circle: "rounded-full",
    text: "rounded h-4 w-full",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="p-6 bg-white border border-slate-100 cut-corner-panel space-y-4">
    <Skeleton className="h-48 w-full" />
    <div className="space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="pt-4 flex justify-between">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-24" />
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="w-full min-h-[40vh] bg-slate-50 flex items-center justify-center p-8">
    <div className="max-w-4xl w-full space-y-6 text-center">
      <Skeleton className="h-16 w-3/4 mx-auto" />
      <Skeleton className="h-6 w-1/2 mx-auto" />
      <div className="flex justify-center gap-4 pt-4">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  </div>
);

export const FormSkeleton = () => (
  <div className="space-y-6 p-8 bg-white border border-slate-100 cut-corner-panel">
    <div className="space-y-2">
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
    <Skeleton className="h-24 w-full" />
    <Skeleton className="h-14 w-full" />
  </div>
);
