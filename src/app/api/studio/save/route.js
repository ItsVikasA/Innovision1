import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const courseData = await request.json();

    if (courseData.id) {
      // Update existing draft
      const docRef = adminDb.collection("studio_courses").doc(courseData.id);
      await docRef.update({
        ...courseData,
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        id: courseData.id,
        message: "Draft updated",
      });
    } else {
      // Create new draft
      const docRef = await adminDb.collection("studio_courses").add({
        ...courseData,
        createdAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        id: docRef.id,
        message: "Draft saved",
      });
    }
  } catch (error) {
    console.error("Error saving draft:", error);
    return NextResponse.json({ error: "Failed to save draft" }, { status: 500 });
  }
}
