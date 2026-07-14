import Image from "next/image";
import { Plus } from "lucide-react";

const stories = [
  {
    id: 1,
    name: "Your Story",
    image: "/images/profile.jpg",
    own: true,
  },
  {
    id: 2,
    name: "Emma",
    image: "/images/profile2.jpg",
  },
  {
    id: 3,
    name: "Alex",
    image: "/images/profile3.jpg",
  },
  {
    id: 4,
    name: "Sophia",
    image: "/images/profile4.jpg",
  },
  {
    id: 5,
    name: "John",
    image: "/images/profile5.jpg",
  },
];

export default function StorySection() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-black">Stories</h2>

        <button className="text-sm font-medium text-[#1890FF] hover:underline">
          View All
        </button>
      </div>

      <div className="mt-5 flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex min-w-[90px] flex-col items-center"
          >
            <div className="relative">
              <div className="rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400 p-[3px]">
                <div className="rounded-full bg-white p-[2px]">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={70}
                    height={70}
                    className="h-[70px] w-[70px] rounded-full object-cover"
                  />
                </div>
              </div>

              {story.own && (
                <button className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#1890FF] text-white">
                  <Plus size={14} />
                </button>
              )}
            </div>

            <p className="mt-3 text-center text-sm font-medium text-black">
              {story.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
