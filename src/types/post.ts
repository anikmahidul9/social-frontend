import { Comment } from "./comment";

export interface Post {
  id: number;
  content: string;
  title: string;
  user_ID: number;
  visibility: string;
  created_at: string;
  updated_at: string;
  comments: Comment[];
  user: User;
  likes_count: number;
  is_liked: boolean;
  images?: PostImage[];
  comments_count: number;
  latest_likes?: LatestLike[];
}



export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  _: {};
  created_at: string;
  updated_at: string;
}

export interface PostImage {
  id: number;
  post_id: number;
  image_url: string;
  created_at: string;
}

export interface LatestLike {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  _: {};
  created_at: string;
  updated_at: string;
}

export interface UpdatePostPayload {
  title?: string;
  content?: string;
  visibility?: "public" | "private";
}
