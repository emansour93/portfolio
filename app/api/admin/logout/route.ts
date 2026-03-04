// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  const cookie = serialize("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // expire immediately
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json(
    { message: "Logged out" },
    { headers: { "Set-Cookie": cookie } },
  );
}
