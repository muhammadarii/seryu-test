"use client";
import Image from "next/image";
import Logo from "@/assets/images/CINEMA.png";
import Logout from "@/assets/images/Logout.png";
import Link from "next/link";
import { useState } from "react";
import { LoginPopup } from "../LoginPopup";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

export const Navbar = () => {
  const { isLoggedIn } = useAuthStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 w-full shadow-lg z-50">
      <div className="py-[14px] px-8 lg:px-[142px] flex justify-between items-center bg-[#0EA5E9] text-white relative z-50">
        <Link href="/">
          <Image
            src={Logo}
            alt="Cinema Logo"
            className="h-3 w-auto lg:w-auto lg:h-10"
          />
        </Link>
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <RxCross2 className="w-6 h-6 text-white" />
          ) : (
            <RxHamburgerMenu className="w-6 h-6 text-white" />
          )}
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-[#0EA5E9] px-8 py-4 flex flex-col gap-4 lg:gap-[20px] lg:py-0 lg:px-0 lg:flex lg:flex-row lg:items-center lg:static lg:w-auto`}
        >
          <Link href="/favorite" onClick={handleProtectedRoute}>
            Favorite
          </Link>
          <Link href="/watchlist" onClick={handleProtectedRoute}>
            Watchlist
          </Link>
          {isLoggedIn && (
            <button onClick={handleLogout}>
              <Image src={Logout} alt="Logout" className="w-auto h-5" />
            </button>
          )}
        </div>
      </div>

      <LoginPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
};
