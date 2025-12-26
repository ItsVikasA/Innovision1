import { adminDb } from "@/lib/firebase-admin";
import { getServerSession } from "@/lib/auth-server";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession();
    const { id } = await params;
    const docRef = adminDb.collection("users").doc(session.user.email).collection("roadmaps").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ process: "Roadmap not found" }, { status: 404 });
    }
    return NextResponse.json(docSnap.data());
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession();

    const { id } = await params;
    const docRef = adminDb.collection("users").doc(session.user.email).collection("roadmaps").doc(id);
    const chaptersRef = adminDb
      .collection("users")
      .doc(session.user.email)
      .collection("roadmaps")
      .doc(id)
      .collection("chapters");

    const chapterSnapshot = await chaptersRef.get();
    const deletePromises = chapterSnapshot.docs.map(async (chapterdoc) => {
      const tasksRef = adminDb
        .collection("users")
        .doc(session.user.email)
        .collection("roadmaps")
        .doc(id)
        .collection("chapters")
        .doc(chapterdoc.id)
        .collection("tasks")
        .doc("task");
      await tasksRef.delete();
      await chapterdoc.ref.delete();
    });
    await Promise.all(deletePromises);
    await docRef.delete();

    return NextResponse.json({ message: "Roadmap deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
