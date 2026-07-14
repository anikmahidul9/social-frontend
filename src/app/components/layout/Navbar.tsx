"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Home, MessageCircle, Search, Settings } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { getUser } from "@/services/user";
import { User } from "@/types/post";
import { useAuth } from "@/app/components/context/authContext";

interface DecodedToken {
  user_id: number;
}

export default function Navbar() {
  const { token, setToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("Token from useAuth:", token);
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        const fetchUser = async () => {
          try {
            const userData = await getUser(decodedToken.user_id);
            console.log("User data from API:", userData);
            setUser(userData);
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        };
        fetchUser();
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={150}
            height={40}
            className="h-auto"
            priority
          />
        </Link>

        {/* Search */}
        <div className="hidden w-full max-w-md lg:block">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="h-11 w-full rounded-full border border-gray-200 bg-[#F7F8FC] pl-11 pr-4 text-black outline-none transition focus:border-[#1890FF] focus:bg-white"
            />
          </div>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-600 transition hover:text-[#1890FF]"
          >
            <Home size={24} />
          </Link>

          <Link
            href="/messages"
            className="text-gray-600 transition hover:text-[#1890FF]"
          >
            <MessageCircle size={24} />
          </Link>

          <button className="relative text-gray-600 transition hover:text-[#1890FF]">
            <Bell size={24} />

            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </button>

          <Link
            href="/settings"
            className="text-gray-600 transition hover:text-[#1890FF]"
          >
            <Settings size={24} />
          </Link>

          {/* Profile */}
          {token && user && (
            <div className="relative">
              <button
                className="flex items-center gap-3"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Profile"
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />

                <div className="hidden text-left lg:block">
                  <h4 className="text-sm font-semibold text-black">
                    {user.username}
                  </h4>
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
