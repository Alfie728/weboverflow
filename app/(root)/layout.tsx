import Navbar from "@/components/shared/Navbar/Navbar";
import LeftSidebar from "@/components/shared/Sidebar/LeftSidebar";
import RightSidebar from "@/components/shared/Sidebar/RightSidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col  p-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto max-w-[80ch]">{children}</div>
        </section>
        <RightSidebar />
      </div>
      Toaster
    </main>
  );
};
export default Layout;
