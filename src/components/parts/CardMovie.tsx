"use client";
import { useAuthStore } from "@/store/authStore";
import { useToggleCardStore } from "@/store/toggleCardStore";
import { CardMovieProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToggleCard } from "./ToggleCard";
import Link from "next/link";

export const CardMovie: React.FC<CardMovieProps> = ({
  onClick,
  title,
  src,
  id,
}) => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { toggleFavorite, toggleWatchlist, favorites, watchlist } =
    useToggleCardStore();

  const isFavorite = favorites.includes(id);
  const isWatchlist = watchlist.includes(id);

  const handleProtectedAction = (action: () => void) => {
    if (!isLoggedIn) {
      router.push("/");
      return;
    }

    action();
  };
  return (
    <div
      onClick={onClick}
      className="bg-[#050E12] w-[193.09px] h-[355.1px] rounded-[6px]"
    >
      <div className="relative">
        <Link
          href={`/movie/${id}`}
          className="absolute top-0 left-0 w-full h-full cursor-pointer z-10"
        />
        <div className="w-[193px] h-[289px] relative rounded-t-[6px] overflow-hidden">
          <Image src={src} alt={title} fill className="object-cover" />
        </div>
        {/* toggle fav and watchlist */}
        <ToggleCard
          id={id}
          isFavorite={isFavorite}
          isWatchlist={isWatchlist}
          toggleFavorite={toggleFavorite}
          toggleWatchlist={toggleWatchlist}
          isLoggedIn={isLoggedIn}
          handleProtectedAction={handleProtectedAction}
        />
      </div>
      <div className="px-[18px] py-[15px]">
        <h1 className="text-[18px] font-bold text-[#B6B6B6] truncate">
          {title}
        </h1>
        <p className="text-[12px] font-normal text-[#828282]">2025</p>
      </div>
    </div>
  );
};
