"use client";

import { sidebarlinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden sm:block h-screen w-64 bg-slate-300 p-6">
      <h1 className="text-2xl font-bold uppercase">Sole API</h1>
      <div className="flex flex-col gap-4 mt-8">
        {sidebarlinks.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href);

          return (
            <Link
              href={link.href}
              key={link.name}
              className={`rounded-md px-4 py-1.5 hover:bg-slate-100 font-semibold ${
                isActive ? "bg-slate-100" : ""
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
