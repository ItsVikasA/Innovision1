import { getServerSession } from "@/lib/auth-server";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, bio, socialLinks } = body;

    const userRef = adminDb.collection("users").doc(session.user.email);

    // Update user document
    await userRef.update({
      name: name || "",
      bio: bio || "",
      socialLinks: socialLinks || {},
      updatedAt: new Date().toISOString(),
    });

    // Fetch updated user data
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    return NextResponse.json(userSnap.data());
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
