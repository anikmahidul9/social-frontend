"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageIcon, Send } from "lucide-react";
import { createPost } from "@/services/post";
import { Post } from "@/types/post";

type Props = {
  onPostCreated: (post: Post) => void;
};

export default function CreatePost({ onPostCreated }: Props) {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    // Clean up object URLs on unmount
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);

      const newImagePreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(newImagePreviews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", "Default Title"); // Set a default title
    formData.append("content", content);
    formData.append("visibility", visibility);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const newPost = await createPost(formData);
      onPostCreated(newPost);
      setContent("");
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start gap-4">
          <Image
            src="/images/profile.jpg"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div className="w-full">
            <textarea
              rows={2}
              placeholder="Write something ..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full resize-none rounded-xl bg-[#F5F7FB] p-4 text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#1890FF]/20"
            />
          </div>
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#1890FF]">
              <ImageIcon size={18} />
              Photo
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                Visibility:
              </span>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="rounded-md border-gray-300 bg-gray-100 text-sm text-black"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-[#1890FF] px-6 py-2.5 font-semibold text-white transition hover:bg-[#0f7fe0]"
          >
            <Send size={18} />
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
