"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserCard from "./user-card";
import type { Session as AuthSessionType } from "@/lib/auth-types";
import { authClient } from "@/lib/auth-client";

type ActiveSessionItem = AuthSessionType["session"];

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSessionType | null>(null);
  const [activeSessions, setActiveSessions] = useState<ActiveSessionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const sessionData = await authClient.getSession();
        const activeSessionsData = await authClient.listSessions();

        setSession(sessionData?.data as AuthSessionType);
        setActiveSessions(activeSessionsData?.data as ActiveSessionItem[]);
      } catch (err) {
        const error = err as Error;
        console.error("Error fetching profile data:", error);
        setError(
          error.message ||
            "Failed to load profile data. Redirecting to sign-in..."
        );
        setTimeout(() => router.push("/signin"), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, refreshKey]);

  if (error && !isLoading) {
    return (
      <div className="w-full px-4 pt-8 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 pt-8">
      <div className="w-full px-4 flex justify-center items-center">
        <UserCard
          session={session}
          activeSessions={activeSessions}
          isLoading={isLoading}
          onTwoFactorChange={() => setRefreshKey((prev) => prev + 1)}
        />
      </div>
    </div>
  );
}
