import Image from "next/image";
import Link from "next/link";
import {
    Bookmark,
    Gamepad2,
    GraduationCap,
    Lightbulb,
    Save,
    Settings,
    UserPlus,
    Users,
} from "lucide-react";

const exploreItems = [
    { title: "Learning", icon: GraduationCap, new: true },
    { title: "Insights", icon: Lightbulb, new: true },
    { title: "Find friends", icon: UserPlus, new: true },
    { title: "Bookmarks", icon: Bookmark, new: true },
    { title: "Group", icon: Users, new: true },
    { title: "Gaming", icon: Gamepad2, new: true },
    { title: "Settings", icon: Settings, new: true },
    { title: "Save post", icon: Save, new: false }, // no [New]
];

const suggestedPeople = [
    { name: "Steve Jobs", title: "CEO of Apple" },
    { name: "Ryan Roslansky", title: "CEO of Linkedin" },
    { name: "Dylan Field", title: "CEO of Figma" },
];

export default function LeftSidebar() {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
            {/* Explore Section */}
            <div>
                <h2 className="mb-3 text-base font-bold text-gray-800">
                    Explore
                </h2>
                <nav className="space-y-0.5">
                    {exploreItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.title}
                                href="#"
                                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} className="text-gray-500" />
                                    <span>{item.title}</span>
                                </div>
                                {item.new && (
                                    <span className="text-xs font-medium text-emerald-600">
                                        New
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200" />

            {/* Suggested People */}
            <div>
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-base font-bold text-gray-800">
                        Suggested People
                    </h2>
                    <Link
                        href="#"
                        className="text-sm font-medium text-[#1890FF] hover:underline"
                    >
                        See All
                    </Link>
                </div>
                <div className="space-y-3">
                    {suggestedPeople.map((person) => {
                        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            person.name
                        )}&size=80&background=random&color=fff&bold=true`;

                        return (
                            <div
                                key={person.name}
                                className="flex items-center gap-3"
                            >
                                <Image
                                    src={avatarUrl}
                                    alt={person.name}
                                    width={44}
                                    height={44}
                                    className="rounded-full object-cover"
                                    unoptimized
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {person.name}
                                    </p>
                                    <p className="truncate text-xs text-gray-500">
                                        {person.title}
                                    </p>
                                </div>
                                <button className="shrink-0 rounded-full border border-[#1890FF] px-4 py-1 text-xs font-medium text-[#1890FF] transition hover:bg-[#1890FF] hover:text-white">
                                    Connect
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}