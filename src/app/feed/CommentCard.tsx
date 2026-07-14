"use client";

import Image from "next/image";
import { ThumbsUp } from "lucide-react";
import { Comment } from "@/types/comment";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { likeComment, unlikeComment, createReply } from "@/services/comment";

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment: initialComment }: Props) {
  const [comment, setComment] = useState<Comment>(initialComment);
  const [isLiked, setIsLiked] = useState(comment.is_liked);
  const [likesCount, setLikesCount] = useState(comment.likes_count || 0);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const timeAgo = comment.created_at
    ? formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })
    : "just now";

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await unlikeComment(comment.id);
        setLikesCount((prev) => prev - 1);
      } else {
        await likeComment(comment.id);
        setLikesCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to like/unlike comment:", error);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("replyInput") as HTMLInputElement | null;
    const content = input?.value;

    if (!content || !content.trim()) return;

    try {
      const newReply = await createReply(comment.id, content);
      setComment((prevComment) => ({
        ...prevComment,
        replies: [...(prevComment.replies || []), newReply],
      }));
      if (input) {
        input.value = "";
      }
      setShowReplyInput(false);
    } catch (error) {
      console.error("Failed to create reply:", error);
    }
  };

  return (
    <div className="flex items-start gap-3">
      <Image
        src="/images/Avatar.png" // Placeholder
        alt={comment.user?.username || "User"}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-1">
        <div className="rounded-xl bg-gray-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">
              {comment.user?.username || "Unknown User"}
            </span>
            {comment.created_at && (
              <span className="text-xs text-gray-500">{timeAgo}</span>
            )}
          </div>
          <p className="mt-1 text-gray-900">{comment.content}</p>
        </div>
        <div className="mt-1 flex items-center gap-4 px-4 text-xs text-gray-500">
          <button
            onClick={handleLikeClick}
            className={`font-medium ${isLiked ? "text-blue-600" : ""}`}
          >
            Like
          </button>
          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="font-medium"
          >
            Reply
          </button>
          <div className="flex items-center gap-1">
            <ThumbsUp size={12} />
            <span>{likesCount}</span>
          </div>
        </div>

        {showReplyInput && (
          <form onSubmit={handleReplySubmit} className="mt-2 flex items-center gap-3">
            <Image
              src="/images/Avatar.png"
              alt=""
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex flex-1 items-center rounded-full bg-gray-100 px-4">
              <input
                name="replyInput"
                placeholder="Write a reply..."
                className="h-9 flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-500"
                autoFocus
              />
            </div>
          </form>
        )}

        {/* Render Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 pl-8">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex items-start gap-3">
                <Image
                  src="/images/Avatar.png" // Placeholder
                  alt={reply.user?.username || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="rounded-xl bg-gray-100 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">
                        {reply.user?.username || "Unknown User"}
                      </span>
                      {reply.created_at && (
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(reply.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-gray-900">{reply.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
