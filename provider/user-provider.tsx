"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "cookies-next";
import { axiosInstance, ENDPOINTS } from "@/config/api-config";
import { type User, type DecodedToken, type Response } from "@/lib/types";
import { formatAxiosError } from "@/lib/format-axios-error";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

async function fetchUser(): Promise<User> {
  const token = getCookie("access-token") as string | undefined;
  if (!token) throw new Error("No access token found");

  let userId: string | null = null;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    userId = decoded.sub;
  } catch (err) {
    throw new Error("Invalid token");
  }

  if (!userId) throw new Error("User ID not found in token");

  try {
    const response = await axiosInstance.get(ENDPOINTS.user.getUser(userId));
    const responseData: Response<User> = response.data;
    return responseData.data;
  } catch (error) {
    throw new Error(formatAxiosError(error));
  }
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: fetchUser,
    retry: false, // don’t spam API if token is invalid
  });

  return (
    <UserContext.Provider value={{ user: user ?? null, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
