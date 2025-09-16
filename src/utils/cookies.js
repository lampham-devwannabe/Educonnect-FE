// lib/cookies.js
import { cookies } from "next/headers";

export async function getUserFromCookies() {
  const cookieStore = await cookies();
  return {
    token: cookieStore.get("access-token")?.value,
    user_id: cookieStore.get("user_id")?.value,
    name: cookieStore.get("name")?.value || "Guest",
    image: cookieStore.get("image")?.value || "/default-avatar.png",
    email: cookieStore.get("email")?.value || "Not Provided",
    role: cookieStore.get("role")?.value || "User",
  };
}

export function setCookies(name, email, image) {
  const cookieStore = cookies();
  cookieStore.set("name", name, {
    sameSite: "strict",
    secure: true,
  });
  cookieStore.set("email", email, {
    sameSite: "strict",
    secure: true,
  });
  cookieStore.set("image", image, {
    sameSite: "strict",
    secure: true,
  });
  
}