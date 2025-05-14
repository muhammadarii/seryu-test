// app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAuthStore } from "@/store/authStore"; // Gunakan zustand misalnya

const AuthCallback = () => {
  const params = useSearchParams();
  const router = useRouter();
  const setSessionId = useAuthStore((state) => state.setSessionId);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    const requestToken = params.get("request_token");
    const approved = params.get("approved");

    const createSession = async () => {
      try {
        const res = await axios.post(
          `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          { request_token: requestToken },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            },
          }
        );

        const sessionId = res.data.session_id;

        if (sessionId) {
          setSessionId(sessionId);
          setIsLoggedIn(true);
          router.push("/");
        }
      } catch (error) {
        console.error("Error creating session:", error);
        router.push("/");
      }
    };

    if (approved === "true" && requestToken) {
      createSession();
    } else {
      console.warn("User did not approve login or token missing.");
      router.push("/");
    }
  }, [params, router, setSessionId, setIsLoggedIn]);

  return <div>Logging you in...</div>;
};

export default AuthCallback;
