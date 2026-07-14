import { api } from "@/lib/axios";
import { User } from "@/types/post";

export const getUser = async (userId: number): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data.data;
};
