import { api } from "@/lib/axios";
import { Post, Comment, UpdatePostPayload } from "@/types/post";

export const getFeedPosts = async (): Promise<Post[]> => {
  const response = await api.get(`/users/feed`);
  const data = response.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.posts)) {
    return data.posts;
  }
  if (data && Array.isArray(data.data)) {
    return data.data;
  }

  console.error(
    "getFeedPosts: response data is not an array or a known object structure:",
    data,
  );
  return [];
};

export const getPost = async (postId: number): Promise<Post> => {
  const response = await api.get(`/posts/${postId}`);
  return response.data.data;
};

export const createComment = async (
  postId: number,
  content: string,
): Promise<Comment> => {
  const response = await api.post(`/posts/${postId}/comments`, { content });
  return response.data.data;
};

export const likePost = async (postId: number): Promise<void> => {
  await api.put(`/posts/${postId}/like`);
};

export const unlikePost = async (postId: number): Promise<void> => {
  await api.delete(`/posts/${postId}/like`);
};

export const createPost = async (formData: FormData): Promise<Post> => {
  const response = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const updatePost = async (
  postId: number,
  payload: UpdatePostPayload,
): Promise<Post> => {
  const response = await api.patch(`/posts/${postId}`, payload);
  return response.data.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  await api.delete(`/posts/${postId}`);
};
