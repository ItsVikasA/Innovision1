// Custom hook for personalization
import { useAuth } from "@/contexts/auth";
import { useEffect, useState } from "react";

export function usePersonalization() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const response = await fetch("/api/personalization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.email,
          action: "getProfile",
        }),
      });
      const data = await response.json();
      setProfile(data.result);
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const recordInteraction = async (action, metrics, context) => {
    try {
      await fetch("/api/personalization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.email,
          action: "recordInteraction",
          data: { action, metrics, context },
        }),
      });
      await loadProfile();
    } catch (error) {
      console.error("Failed to record interaction:", error);
    }
  };

  const getRecommendation = async (context, actions) => {
    try {
      const response = await fetch("/api/personalization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.email,
          action: "getRecommendation",
          data: { context, actions },
        }),
      });
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Failed to get recommendation:", error);
      return actions[0];
    }
  };

  return {
    profile,
    loading,
    recordInteraction,
    getRecommendation,
  };
}
