"use client";
import { useAuthStore } from "@/store/authStore";
import { useToggleCardStore } from "@/store/toggleCardStore";
import { CardMovieProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { FaHeart, FaBookmark } from "react-icons/fa";

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
        <div className="w-[193px] h-[289px] relative rounded-t-[6px] overflow-hidden">
          <Image src={src} alt={title} fill className="object-cover" />
        </div>
        {/* toggle fav and watchlist */}
        <div className="z-10 flex flex-row absolute bottom-[10px] right-[10px] gap-[10px]">
          {isLoggedIn ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleProtectedAction(() => toggleWatchlist(id));
                }}
                title="Add to Watchlist"
              >
                {isWatchlist ? (
                  <FaBookmark size={20} color="white" />
                ) : (
                  <CiBookmark size={25} color="white" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleProtectedAction(() => toggleFavorite(id));
                }}
                title="Add to Favorite"
              >
                {isFavorite ? (
                  <FaHeart size={20} color="red" />
                ) : (
                  <CiHeart size={25} color="white" />
                )}
              </button>
            </>
          ) : (
            <>
              <span title="Login to add to Watchlist">
                <CiBookmark size={25} color="white" />
              </span>
              <span title="Login to add to Favorite">
                <CiHeart size={25} color="white" />
              </span>
            </>
          )}
        </div>
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
