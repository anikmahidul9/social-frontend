import { api } from "@/lib/axios";
import { User } from "@/types/post";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

interface LoginApiResponse {
  data: {
    token: string;
  };
}

export async function login(data: LoginPayload) {
  const response = await api.post<LoginApiResponse>(
    "/authentication/login",
    data
  );

  return response.data.data;
}

export async function registerUser(data: RegisterPayload): Promise<User> {
  const response = await api.post("/authentication/user", data);
  return response.data.data;
}
