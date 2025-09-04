import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { UserRole } from "./types";

export async function getUserData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access-token")?.value;

  let userId = "";
  let userRole: UserRole | null = null;
  let userCountry: string | null = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);

      userId = payload.sub as string;
      userRole = payload.role as UserRole;
      userCountry = payload.country as string;
    } catch (err) {
      console.error("JWT decode/verify failed:", err);
    }
  }

  return { userId, userRole, userCountry };
}
