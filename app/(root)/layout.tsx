import Navbar from "@/components/shared/Navbar/Navbar";
import LeftSidebar from "@/components/shared/Sidebar/LeftSidebar";
import RightSidebar from "@/components/shared/Sidebar/RightSidebar";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Overflow",
  description:
    "Web Overflow is a platform for web developers to ask questions and get help from the community.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col items-center overflow-auto p-6 pt-36 sm:px-14">
          <div className="w-full max-w-[80ch]">{children}</div>
        </section>
        <RightSidebar />
      </div>
      <Toaster />
    </main>
  );
};
export default Layout;
