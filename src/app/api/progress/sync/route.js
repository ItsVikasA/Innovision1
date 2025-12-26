// Progress Sync API for Offline Support
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const progress = await request.json();

    if (!progress.userId || !progress.courseId) {
      return NextResponse.json({ error: "Invalid progress data" }, { status: 400 });
    }

    // Save to Firebase
    const progressRef = adminDb.collection("progress").doc(`${progress.userId}_${progress.courseId}_${Date.now()}`);
    await progressRef.set({
      ...progress,
      syncedAt: Date.now(),
    });

    return NextResponse.json({ success: true, message: "Progress synced successfully" });
  } catch (error) {
    console.error("Progress sync error:", error);
    return NextResponse.json({ error: "Failed to sync progress" }, { status: 500 });
  }
}
