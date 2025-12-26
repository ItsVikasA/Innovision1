"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart3, Wifi, Brain, Video, BookOpen } from "lucide-react";

export default function FeaturesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  const features = [
    {
      title: "Analytics Dashboard",
      description: "Track student performance, engagement metrics, and course completion rates",
      icon: <BarChart3 className="w-12 h-12 text-blue-500" />,
      href: "/features/analytics",
      color: "bg-blue-50 dark:bg-blue-950"
    },
    {
      title: "Multimodal Content",
      description: "Generate audio scripts and video storyboards for your courses",
      icon: <Video className="w-12 h-12 text-purple-500" />,
      href: "/features/multimodal",
      color: "bg-purple-50 dark:bg-purple-950"
    },
    {
      title: "AI Personalization",
      description: "Advanced learning recommendations using reinforcement learning",
      icon: <Brain className="w-12 h-12 text-green-500" />,
      href: "/features/personalization",
      color: "bg-green-50 dark:bg-green-950"
    },
    {
      title: "Offline Learning",
      description: "Download courses and learn offline, sync progress automatically",
      icon: <Wifi className="w-12 h-12 text-orange-500" />,
      href: "/features/offline",
      color: "bg-orange-50 dark:bg-orange-950"
    },
    {
      title: "LMS Integration",
      description: "Connect with Moodle or Canvas to sync courses and grades",
      icon: <BookOpen className="w-12 h-12 text-red-500" />,
      href: "/features/lms",
      color: "bg-red-50 dark:bg-red-950"
    },
    {
      title: "Project-Based Learning",
      description: "Build real-world projects with mentor guidance and professional reviews",
      icon: <BarChart3 className="w-12 h-12 text-teal-500" />,
      href: "/features/projects",
      color: "bg-teal-50 dark:bg-teal-950"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Advanced Features</h1>
        <p className="text-lg text-muted-foreground">
          Unlock powerful tools to enhance your learning experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link key={feature.title} href={feature.href}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader>
                <div className={`w-20 h-20 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Explore →
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
