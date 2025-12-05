"use client";

import Sidebar from "@/Components/Sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#F6F7FC]">

      {/* Sidebar (your component is already responsive) */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div
        className="
          flex-1 flex flex-col 
          w-full 
          px-1 sm:px-3 lg:px-5  /* responsive padding */
          pt-3 lg:pt-3         /* space for mobile header if any */
          lg:pl-64              /* only apply left padding on desktop */
          transition-all
        "
      >
        {children}
      </div>

    </div>
  );
}
