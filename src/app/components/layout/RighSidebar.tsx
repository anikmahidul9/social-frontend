import Image from "next/image";
import Link from "next/link";

// Sample data – replace with your real data
const suggestion = {
  name: "Radovan SkillArena",
  title: "Founder & CEO at Trophy",
};

const friends = [
  { name: "Steve Jobs", title: "CEO of Apple", time: "5 minute ago" },
  { name: "Ryan Roslansky", title: "CEO of LinkedIn", time: "5 minute ago" },
  { name: "Dylan Field", title: "CEO of Figma", time: "5 minute ago" },
  { name: "Steve Jobs", title: "CEO of Apple", time: "5 minute ago" },
  { name: "Ryan Roslansky", title: "CEO of LinkedIn", time: "5 minute ago" },
];

export default function RightSidebar() {
  return (
    <div className="space-y-6">
      {/* You Might Like */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">You Might Like</h2>
          <Link
            href="#"
            className="text-sm font-medium text-[#1890FF] hover:underline"
          >
            See All
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Image
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              suggestion.name,
            )}&size=80&background=random&color=fff&bold=true`}
            alt={suggestion.name}
            width={52}
            height={52}
            className="rounded-full object-cover"
            unoptimized
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900">{suggestion.name}</p>
            <p className="truncate text-sm text-gray-500">{suggestion.title}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100">
            Ignore
          </button>
          <button className="flex-1 rounded-full bg-[#1890FF] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-blue-600">
            Follow
          </button>
        </div>
      </div>

      {/* Your Friends */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Your Friends</h2>
          <Link
            href="#"
            className="text-sm font-medium text-[#1890FF] hover:underline"
          >
            See All
          </Link>
        </div>

        {/* Search input */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="input search text"
            className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 outline-none focus:border-[#1890FF] focus:ring-1 focus:ring-[#1890FF]"
          />
        </div>

        {/* Friends list */}
        <div className="space-y-4">
          {friends.map((friend, index) => (
            <div key={index} className="flex items-center gap-3">
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  friend.name,
                )}&size=80&background=random&color=fff&bold=true`}
                alt={friend.name}
                width={44}
                height={44}
                className="rounded-full object-cover"
                unoptimized
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">{friend.name}</p>
                <p className="truncate text-sm text-gray-500">{friend.title}</p>
              </div>
              <span className="shrink-0 text-xs text-gray-400">
                {friend.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
