"use client";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const FavoritePage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      redirect("/");
    }
  }, [isLoggedIn]);
  return <div>Favorite Page</div>;
};

export default FavoritePage;
