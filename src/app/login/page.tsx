import Image from "next/image";
import LoginCard from "../components/auth/LoginCard";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F6F8FC]">
      {/* Background Shapes */}
      <Image
        src="/images/shape1.svg"
        alt=""
        width={340}
        height={340}
        className="absolute left-0 top-0 pointer-events-none select-none"
      />

      <Image
        src="/images/shape2.svg"
        alt=""
        width={260}
        height={260}
        className="absolute right-0 top-0 pointer-events-none select-none"
      />

      <div className="mx-auto flex min-h-screen max-w-[1320px] items-center px-6 py-12">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          {/* Left Illustration */}
          <div className="hidden lg:flex justify-center">
            <Image
              src="/images/login.png"
              alt="login"
              width={633}
              height={640}
              priority
              className="w-full max-w-[630px]"
            />
          </div>

          {/* Login Form */}
          <div className="flex justify-center lg:justify-end">
            <LoginCard />
          </div>
        </div>
      </div>
    </main>
  );
}
