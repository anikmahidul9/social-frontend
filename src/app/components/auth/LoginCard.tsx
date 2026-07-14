"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function LoginCard() {
  const router = useRouter();
  const { setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login({
        email,
        password,
      });

      setToken(res.token);

      router.push("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };
  return (
    <div className="w-full max-w-[520px] rounded-[8px] bg-white px-[48px] py-[48px] shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      {/* Logo */}
      <div className="mb-[45px] flex justify-center">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={165}
          height={44}
          priority
        />
      </div>

      {/* Welcome */}
      <div className="mb-[45px] text-center">
        <p className="mb-2 text-[18px] font-medium text-[#6B7280]">
          Welcome Back
        </p>

        <h1 className="text-[34px] font-semibold leading-tight text-[#111827]">
          Login to your account
        </h1>
      </div>

      {/* Google Login */}
      <button
        type="button"
        className="mb-[42px] flex h-[56px] w-full items-center justify-center rounded-md border border-[#E5E7EB] bg-white transition hover:bg-gray-50"
      >
        <Image src="/images/google.svg" alt="Google" width={22} height={22} />

        <span className="ml-3 text-[16px] font-medium text-[#374151]">
          Continue with Google
        </span>
      </button>

      {/* Divider */}
      <div className="relative mb-[38px] flex items-center justify-center">
        <div className="absolute left-0 h-px w-[42%] bg-[#E5E7EB]" />

        <span className="bg-white px-3 text-[14px] text-[#9CA3AF]">OR</span>

        <div className="absolute right-0 h-px w-[42%] bg-[#E5E7EB]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-[15px] font-medium text-[#374151]">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-[56px] w-full rounded-md border border-[#E5E7EB] px-5 outline-none transition focus:border-[#3B82F6]"
          />
        </div>

        <div>
          <label className="mb-2 block text-[15px] font-medium text-[#374151]">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="h-[56px] w-full rounded-md border border-[#E5E7EB] px-5 outline-none transition focus:border-[#3B82F6]"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-[15px] text-[#6B7280]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#0F6FFF] focus:ring-[#0F6FFF]"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-[15px] font-medium text-[#0F6FFF] transition hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="mt-2 h-[56px] w-full rounded-md bg-[#0F6FFF] text-[16px] font-semibold text-white transition duration-200 hover:bg-[#0b5ed7]"
        >
          Login
        </button>
      </form>

      <div className="mt-[40px] text-center">
        <p className="text-[15px] text-[#6B7280]">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#0F6FFF] transition hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
