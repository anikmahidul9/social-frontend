"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser, RegisterPayload } from "@/services/auth";

export default function RegisterCard() {
  const [formData, setFormData] = useState<RegisterPayload>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser(formData);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-[520px] rounded-lg bg-white p-12 shadow-sm">
      <div className="mb-10 flex justify-center">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={170}
          height={45}
          priority
        />
      </div>

      <div className="mb-10 text-center">
        <p className="mb-2 text-[18px] text-gray-500">Welcome</p>
        <h1 className="text-[32px] font-semibold text-[#1A202C]">
          Create Your Account
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
              className="h-12 w-full rounded-md border border-gray-200 px-4 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
              className="h-12 w-full rounded-md border border-gray-200 px-4 outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="h-12 w-full rounded-md border border-gray-200 px-4 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="h-12 w-full rounded-md border border-gray-200 px-4 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="h-12 w-full rounded-md border border-gray-200 px-4 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 w-full rounded-md border border-gray-200 px-4 outline-none transition focus:border-[#1890FF]"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="mt-2 h-14 w-full rounded-md bg-[#1890FF] text-base font-semibold text-white transition hover:bg-[#0f7fe0]"
        >
          Create Account
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#1890FF] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}