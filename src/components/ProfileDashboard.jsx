"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";

const ProfileDashboard = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchUserData();
    }
  }, [authLoading]);

  if (authLoading || loading) {
    return <div>Loading...</div>;
  }

  const displayUser = user || authUser;

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold">Profile Dashboard</h1>
      {displayUser ? (
        <div>
          <h2 className="text-xl">Welcome, {displayUser.name}</h2>
          <p>Email: {displayUser.email}</p>
          {/* Add more user information and courses here */}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfileDashboard;
