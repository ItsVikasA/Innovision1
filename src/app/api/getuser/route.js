import { getServerSession } from "@/lib/auth-server";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(req) {
  try {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    const docRef = adminDb.collection("users").doc(session.user.email);
    const userSnap = await docRef.get();

    if (!userSnap.exists) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    return NextResponse.json(userSnap.data());
  } catch (error) {
    console.error("Error in getuser route:", error);
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
