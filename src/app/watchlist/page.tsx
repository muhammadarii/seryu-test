"use client";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const WatchlistPage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      redirect("/");
    }
  }, [isLoggedIn]);
  return <div>Watchlist Page</div>;
};

export default WatchlistPage;
