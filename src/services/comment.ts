import { api } from "@/lib/axios";
import { Comment } from "@/types/comment";

export const likeComment = async (commentId: number): Promise<void> => {
  await api.put(`/comments/${commentId}/like`);
};

export const unlikeComment = async (commentId: number): Promise<void> => {
  await api.delete(`/comments/${commentId}/like`);
};

export const createReply = async (
  commentId: number,
  content: string,
): Promise<Comment> => {
  const response = await api.post(`/comments/${commentId}/replies`, {
    content,
  });
  return response.data.data;
};
