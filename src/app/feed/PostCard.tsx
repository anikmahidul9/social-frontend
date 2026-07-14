"use client";

import Image from "next/image";
import {
  Globe,
  MoreVertical,
  ThumbsUp,
  MessageCircle,
  Share2,
  Edit,
  Trash,
} from "lucide-react";
import { Post, UpdatePostPayload } from "@/types/post";
import { Comment } from "@/types/comment";
import CommentCard from "./CommentCard";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import {
  getPost,
  createComment,
  likePost,
  unlikePost,
  updatePost,
  deletePost,
} from "@/services/post";
import { useAuth } from "../components/context/authContext";

type Props = {
  post: Post;
  onPostDeleted: (postId: number) => void;
};

export default function PostCard({ post: initialPost, onPostDeleted }: Props) {
  const [post, setPost] = useState(initialPost);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(
    initialPost.comments || [],
  );
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isLiked, setIsLiked] = useState(initialPost.is_liked);
  const [likesCount, setLikesCount] = useState(initialPost.likes_count);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(initialPost.content);
  const [editedVisibility, setEditedVisibility] = useState(
    initialPost.visibility,
  );
  const { userId } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: UpdatePostPayload = {};
    if (editedContent !== initialPost.content) payload.content = editedContent;
    if (editedVisibility !== initialPost.visibility)
      payload.visibility = editedVisibility as "public" | "private";

    if (Object.keys(payload).length === 0) {
      setIsEditing(false);
      return;
    }

    try {
      const updatedPost = await updatePost(post.id, payload);
      setPost(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post.id);
        onPostDeleted(post.id);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await unlikePost(post.id);
        setLikesCount((prev) => prev - 1);
      } else {
        await likePost(post.id);
        setLikesCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to like/unlike post:", error);
    }
  };

  const timeAgo = post.created_at
    ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
    : "just now";

  const postImageUrl = post.images?.[0]?.image_url || null;

  const handleCommentClick = async () => {
    const newShowState = !showComments;
    setShowComments(newShowState);

    if (newShowState && post.comments_count > comments.length) {
      setIsLoadingComments(true);
      try {
        console.log(`Fetching comments for post ID: ${post.id}`);
        const fullPost = await getPost(post.id);
        setComments(fullPost.comments || []);
      } catch (error) {
        console.error(`Failed to fetch comments for post ID: ${post.id}`, error);
      } finally {
        setIsLoadingComments(false);
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("commentInput") as HTMLInputElement | null;
    const content = input?.value;

    if (!content || !content.trim()) return;

    try {
      const createdComment = await createComment(post.id, content);
      setComments([createdComment, ...comments]);
      if (input) {
        input.value = ""; // Clear the input
      }
      if (!showComments) {
        setShowComments(true);
      }
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between p-5">
        <div className="flex gap-3">
          <Image
            src="/images/Avatar.png"
            alt={post.user?.username || "User Avatar"}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">
              {post.user?.username || "Unknown User"}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>{timeAgo}</span>
              <span>•</span>
              <Globe size={13} />
              <span>{post.visibility}</span>
            </div>
          </div>
        </div>
        {userId === post.user_ID && (
          <div className="relative">
            <button
              className="rounded-full p-2 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MoreVertical size={18} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Edit size={16} className="mr-3" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <Trash size={16} className="mr-3" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Caption */}
      {isEditing ? (
        <form onSubmit={handleUpdate} className="p-5">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="mt-2 w-full rounded-md border border-gray-300 p-2"
          />
          <div className="mt-2">
            <select
              value={editedVisibility}
              onChange={(e) => setEditedVisibility(e.target.value)}
              className="rounded-md border border-gray-300 p-2"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="px-5">
          <p className="text-[15px] leading-7 text-gray-900">{post.content}</p>
        </div>
      )}

      {/* Image */}
      {post.images?.[0]?.image_url && (
        <div className="mt-4 px-5">
          <Image
            src={post.images?.[0]?.image_url}
            alt="Post"
            width={900}
            height={600}
            className="rounded-xl object-cover"
          />
        </div>
      )}

      {/* Stats */}
      <div className="mt-5 flex items-center justify-between px-5">
        <div className="flex items-center">
          {post.latest_likes && post.latest_likes.length > 0 && (
            <div className="flex -space-x-2">
              {post.latest_likes.map((like) => (
                <Image
                  key={like.id}
                  src="/images/Avatar.png"
                  alt={like.username}
                  width={28}
                  height={28}
                  className="rounded-full border-2 border-white"
                />
              ))}
              {post.likes_count > 4 && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-xs font-semibold text-white">
                  +{post.likes_count - 4}
                </div>
              )}
            </div>
          )}
          <span className="ml-3 text-sm text-gray-500">
            {likesCount || 0} Likes
          </span>
        </div>
        <div className="flex gap-5 text-sm text-gray-500">
          <button onClick={handleCommentClick} className="hover:underline">
            {post.comments_count || 0} Comments
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-4 px-5 py-4">
          {isLoadingComments && <div className="text-center text-gray-500">Loading comments...</div>}
          {!isLoadingComments && comments.length === 0 && <div className="text-center text-gray-500">No comments yet.</div>}
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mx-5 mt-4 grid grid-cols-3 border-y border-gray-200">
        <button
          onClick={handleLikeClick}
          className={`flex items-center justify-center gap-2 py-3 font-medium transition hover:bg-gray-100 ${
            isLiked ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <ThumbsUp size={18} />
          {isLiked ? "Liked" : "Like"}
        </button>
        <button
          onClick={handleCommentClick}
          className="flex items-center justify-center gap-2 py-3 font-medium text-gray-600 transition hover:bg-gray-100"
        >
          <MessageCircle size={18} />
          Comment
        </button>
        <button className="flex items-center justify-center gap-2 py-3 font-medium text-gray-600 transition hover:bg-gray-100">
          <Share2 size={18} />
          Share
        </button>
      </div>

      {/* Write Comment */}
      <form onSubmit={handleCommentSubmit} className="flex items-center gap-3 p-5">
        <Image
          src="/images/Avatar.png"
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-1 items-center rounded-full bg-gray-100 px-4">
          <input
            name="commentInput"
            placeholder="Write a comment..."
            className="h-11 flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-500"
          />
        </div>
      </form>
    </div>
  );
}
