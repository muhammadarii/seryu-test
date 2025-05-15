"use client";
import { useState } from "react";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { LoginPopup } from "./LoginPopup";

interface ToggleCardProps {
  id: number;
  isFavorite: boolean;
  isWatchlist: boolean;
  toggleFavorite: (id: number) => void;
  toggleWatchlist: (id: number) => void;
  isLoggedIn: boolean;
  handleProtectedAction: (action: () => void) => void;
}

export const ToggleCard: React.FC<ToggleCardProps> = ({
  id,
  isFavorite,
  isWatchlist,
  toggleFavorite,
  toggleWatchlist,
  isLoggedIn,
  handleProtectedAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-20 flex flex-row absolute bottom-[10px] right-[10px] gap-[10px]">
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
              <FaBookmark size={22} color="white" />
            ) : (
              <CiBookmark size={22} color="white" />
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
              <FaHeart size={22} color="red" />
            ) : (
              <CiHeart size={22} color="white" />
            )}
          </button>
        </>
      ) : (
        <>
          <button onClick={handleClick} title="Login to add to Watchlist">
            <CiBookmark size={22} color="white" />
          </button>
          <button onClick={handleClick} title="Login to add to Favorite">
            <CiHeart size={22} color="white" />
          </button>
          <LoginPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
};
