"use client";

import { useEffect, useState, useCallback } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import StorySection from "./StorySection";
import { getFeedPosts } from "@/services/post";
import { Post } from "@/types/post";

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedPosts = await getFeedPosts();
      if (Array.isArray(fetchedPosts)) {
        setPosts(fetchedPosts);
      } else {
        console.error("Fetched posts is not an array:", fetchedPosts);
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const handlePostDeleted = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div className="space-y-6">
      <StorySection />
      <CreatePost onPostCreated={handlePostCreated} />
      {loading ? (
        <div>Loading posts...</div>
      ) : (
        Array.isArray(posts) &&
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onPostDeleted={handlePostDeleted}
          />
        ))
      )}
    </div>
  );
}
