"use server";

import { cookies as nextCookies } from "next/headers";
import { AdminLoginService } from "@/services/admin-login-service";
import { LoginResponse } from "@/types/types";

export async function adminLoginAction(formData: FormData): Promise<LoginResponse> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await AdminLoginService(email, password);

    // 🔥 Set token in HTTP-only cookie
    if (result?.token) {
      // In server actions, cookies() returns a writable object
      const cookieStore = await nextCookies();

      cookieStore.set("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return {
      success: true,
      token: result.token,
      user: result.user,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      token: null,
      user: null,
      error: error?.message ?? "Login failed",
    };
  }
}
