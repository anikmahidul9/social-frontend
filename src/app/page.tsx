"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./components/context/authContext";
import Navbar from "./components/layout/Navbar";
import RightSidebar from "./components/layout/RighSidebar";
import LeftSidebar from "./components/layout/LeftSidebar";
import Feed from "./feed/Feed";

export default function Home() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login");
    }
  }, [token, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <Navbar />

      <div className="mx-auto max-w-[1320px] px-6 py-2">
        <div className="grid grid-cols-12 gap-8">
          <aside className="hidden xl:block xl:col-span-3">
            <LeftSidebar />
          </aside>

          <section className="col-span-12 xl:col-span-6">
            <Feed />
          </section>

          <aside className="hidden xl:block xl:col-span-3">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}
