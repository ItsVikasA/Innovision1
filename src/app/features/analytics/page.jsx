"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AnalyticsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    // Check if user has instructor role (you can implement this check)
    if (user) {
      setIsInstructor(true); // For now, all users can access
    }
  }, [status, router, session]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Link href="/features">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Features
            </Button>
          </Link>
        </div>
        
        {isInstructor ? (
          <AnalyticsDashboard instructorId={session.user.email} />
        ) : (
          <div className="text-center p-12">
            <h2 className="text-2xl font-bold mb-4">Instructor Access Required</h2>
            <p className="text-muted-foreground">
              This feature is available for instructors. Contact support to upgrade your account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
