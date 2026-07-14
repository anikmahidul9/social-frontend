import { User } from "./post";

export interface Comment {
  id: number;
  content: string;
  user: User;
  created_at: string;
  likes_count: number;
  is_liked: boolean;
  replies?: Comment[];
}
