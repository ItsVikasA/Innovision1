import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const courseData = await request.json();

    // Save to published courses collection
    const docRef = await adminDb.collection("published_courses").add({
      ...courseData,
      status: "published",
      publishedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: "Course published successfully",
    });
  } catch (error) {
    console.error("Error publishing course:", error);
    return NextResponse.json({ error: "Failed to publish course" }, { status: 500 });
  }
}
