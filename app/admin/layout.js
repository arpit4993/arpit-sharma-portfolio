"use client";

import { useEffect, useState } from "react";

import { useRouter, usePathname } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {

  const router = useRouter();

  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

  if (pathname === "/admin/login") {

    setLoading(false);

    return;

  }

  const loggedIn = localStorage.getItem("admin-auth");

  if (!loggedIn) {

    router.replace("/admin/login");

  } else {

    setLoading(false);

  }

}, [router, pathname]);

  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center">

        <div className="text-white text-xl font-semibold">
          Loading...
        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <main className="flex-1 ml-72">

        <div className="p-8 lg:p-10">

          {children}

        </div>

      </main>

    </div>

  );

}