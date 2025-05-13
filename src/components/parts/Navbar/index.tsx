import Image from "next/image";
import Logo from "@/assets/images/CINEMA.png";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="py-[14px] px-[142px] flex flex-row justify-between bg-[#0EA5E9]">
      <Link href={"/"}>
        <Image src={Logo} alt="logo" />
      </Link>
      <div className="flex flex-row items-center">
        <Link href="/favorite" className="mx-4">
          Favorite
        </Link>
        <Link href="/watchlist" className="mx-4">
          Watchlist
        </Link>
      </div>
    </div>
  );
};
