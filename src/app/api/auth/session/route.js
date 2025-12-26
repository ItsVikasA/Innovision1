import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { idToken } = await req.json();
    const cookieStore = await cookies();

    if (idToken) {
      // Set session cookie
      cookieStore.set("session", idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 5, // 5 days
      });
      return NextResponse.json({ success: true });
    } else {
      // Clear session cookie
      cookieStore.delete("session");
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("Session API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return NextResponse.json({ success: true });
}
