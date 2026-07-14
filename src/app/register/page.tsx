import Image from "next/image";
import RegisterCard from "../components/auth/RegisterCard";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F6F8FC]">
      {/* Background Shapes */}
      <Image
        src="/images/shape1.svg"
        alt=""
        width={320}
        height={320}
        className="absolute left-0 top-0"
      />

      <Image
        src="/images/shape2.svg"
        alt=""
        width={260}
        height={260}
        className="absolute right-0 top-0"
      />

      <div className="mx-auto flex min-h-screen max-w-[1320px] items-center px-6 py-10">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          {/* Left Image */}
          <div className="hidden lg:flex justify-center">
            <Image
              src="/images/registration.png"
              alt="Register"
              width={620}
              height={620}
              priority
              className="w-full max-w-[620px]"
            />
          </div>

          {/* Right Card */}
          <div className="flex justify-center lg:justify-end">
            <RegisterCard />
          </div>
        </div>
      </div>
    </main>
  );
}