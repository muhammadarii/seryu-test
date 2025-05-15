"use client";
import Image from "next/image";
import Logo from "@/assets/images/CINEMA.png";
import Logout from "@/assets/images/Logout.png";
import Link from "next/link";
import { useState } from "react";
import { LoginPopup } from "../LoginPopup";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";

export const Navbar = () => {
  const { isLoggedIn } = useAuthStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);

  const handleProtectedRoute = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setIsOpen(true);
    }
  };
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    redirect("/");
  };
  return (
    <>
      <nav className="py-[14px] px-[142px] flex justify-between items-center bg-[#0EA5E9] text-white">
        <Link href="/">
          <Image src={Logo} alt="Cinema Logo" className="w-auto h-10" />
        </Link>
        <div className="flex items-center gap-[20px]">
          <Link href="/favorite" onClick={handleProtectedRoute}>
            Favorite
          </Link>
          <Link href="/watchlist" onClick={handleProtectedRoute}>
            Watchlist
          </Link>
          {isLoggedIn && (
            <button onClick={handleLogout}>
              <Image src={Logout} alt="TMDB Logo" className="w-auto h-5" />
            </button>
          )}
        </div>
      </nav>
      <LoginPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
