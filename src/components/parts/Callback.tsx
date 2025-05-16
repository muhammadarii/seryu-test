"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { FetchSession } from "@/lib/AuthApi";

export const Callback = () => {
  const params = useSearchParams();
  const router = useRouter();

  const setSessionId = useAuthStore((state) => state.setSessionId);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const requestToken = params.get("request_token");
  const approved = params.get("approved");

  const createSession = async (token: string) => {
    try {
      const session = await FetchSession(token);
      if (!session.session_id) throw new Error("No session_id returned");

      setSessionId(session.session_id);
      setIsLoggedIn(true);
      router.push("/");
    } catch (error) {
      console.error("Failed to create session:", error);
      router.push("/");
    }
  };

  useEffect(() => {
    if (approved === "true" && requestToken) {
      createSession(requestToken);
    } else {
      console.warn("Login not approved or token missing.");
      router.push("/");
    }
  }, [approved, requestToken]);

  return <div>Logging you in...</div>;
};
