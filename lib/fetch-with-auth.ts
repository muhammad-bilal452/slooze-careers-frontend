import { axiosInstance } from "@/config/api-config";
import { cookies } from "next/headers";

export async function fetchWithAuth(url: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access-token")?.value;

  return axiosInstance.get(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}