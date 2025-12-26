import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET(req) {
  const docRef = adminDb.collection("roadmaps").doc(req.nextUrl.searchParams.get("id"));
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return NextResponse.json({ message: "Roadmap not found" }, { status: 404 });
  }

  return NextResponse.json(docSnap.data());
}
