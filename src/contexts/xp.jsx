"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/auth";

const xpContext = createContext();

export const XpProvider = ({ children }) => {
  const { user } = useAuth();
  const [xp, setXp] = useState(0);
  const [show, setShow] = useState(false);
  const [changed, setChanged] = useState(0);

  async function change() {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      setChanged(0);
    }, 2000);
  }

  const getXp = useCallback(async () => {
    if (!user?.email) return;

    try {
      const res = await fetch(`/api/gamification/stats?userId=${user.email}`);
      const data = await res.json();

      if (data && typeof data.xp === "number") {
        const xpDiff = data.xp - xp;
        if (xpDiff > 0 && xp > 0) {
          setChanged(xpDiff);
        }
        setXp(data.xp);
      }
    } catch (error) {
      console.error("Error fetching XP:", error);
    }
<<<<<<< HEAD
  }, [session, xp]);
=======
  }, [user, xp]);
>>>>>>> 12cdf468bf67055cd4fddc04aa2fb76e3d24d93d

  const awardXP = useCallback(
    async (action, value = null) => {
      if (!user?.email) return;

      try {
        const res = await fetch("/api/gamification/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.email,
            action,
            value,
          }),
        });

        const result = await res.json();

<<<<<<< HEAD
      if (result.success) {
        await getXp();
        return result;
=======
        if (result.success) {
          // Refresh XP to show the update
          await getXp();
          return result;
        }
      } catch (error) {
        console.error("Error awarding XP:", error);
>>>>>>> 12cdf468bf67055cd4fddc04aa2fb76e3d24d93d
      }
    },
    [user, getXp]
  );

  useEffect(() => {
    if (user?.email) {
      getXp();

      // Poll for XP updates every 10 seconds for real-time feel
      const interval = setInterval(getXp, 10000);
      return () => clearInterval(interval);
    }
<<<<<<< HEAD
  }, [session, getXp]);

  useEffect(() => {
    if (session?.user?.email) {
      getXp();

      const interval = setInterval(getXp, 5000);
      return () => clearInterval(interval);
    }
  }, [session, getXp]);
=======
  }, [user, getXp]);
>>>>>>> 12cdf468bf67055cd4fddc04aa2fb76e3d24d93d

  return <xpContext.Provider value={{ getXp, awardXP, xp, show, changed }}>{children}</xpContext.Provider>;
};

export default xpContext;
