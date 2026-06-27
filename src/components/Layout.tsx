"use client";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-6 md:py-10">
        <div className="smru-container max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
