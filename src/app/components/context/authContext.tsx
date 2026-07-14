/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  token: string | null;
  loading: boolean;
  setToken: (token: string | null) => void;
  userId: number | null;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  loading: true,
  setToken: () => {},
  userId: null,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    console.log("savedToken from localStorage:", savedToken);

    setToken(savedToken);
    if (savedToken) {
      try {
        const decodedToken: { user_id: number } = jwtDecode(savedToken);
        setUserId(decodedToken.user_id);
      } catch (error) {
        console.error("Failed to decode token:", error);
        handleSetToken(null);
      }
    }
    setLoading(false);
  }, []);

  const handleSetToken = (token: string | null) => {
    setToken(token);
    if (token) {
      localStorage.setItem("token", token);
      try {
        const decodedToken: { sub: number } = jwtDecode(token);
        setUserId(decodedToken.sub);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUserId(null);
      }
    } else {
      localStorage.removeItem("token");
      setUserId(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, loading, setToken: handleSetToken, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);