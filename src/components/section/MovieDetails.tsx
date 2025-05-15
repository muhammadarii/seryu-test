import { Movie } from "@/types";
import Image from "next/image";
import { CircularProgress } from "../parts/CircularProgress";
import { ToggleCard } from "../parts/ToggleCard";
import { useToggleCardStore } from "@/store/toggleCardStore";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { LoginPopup } from "../parts/LoginPopup";

interface MovieDetailsProps {
  data: Movie;
  formatRuntime: (minutes: number) => string;
  userScore: number;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  data,
  formatRuntime,
  userScore,
}) => {
  const { isLoggedIn } = useAuthStore();
  const { toggleFavorite, toggleWatchlist, favorites, watchlist } =
    useToggleCardStore();
  const [isOpen, setIsOpen] = useState(false);

  const isFavorite = favorites.includes(data.id);
  const isWatchlist = watchlist.includes(data.id);

  const handleProtectedAction = (action: () => void) => {
    if (!isLoggedIn) {
      setIsOpen(true);
      return;
    }

    action();
  };

  return (
    <div className="relative w-full h-[400px]">
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.backdrop_path}`}
        alt="Image"
        fill
        className="object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
      <div className="absolute top-[20px] left-[20px] lg:top-[50px] lg:left-[142px] flex flex-row gap-[20px]">
        <div className="w-[100px] h-[199px] lg:w-[200px] lg:h-[299.54px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.poster_path}`}
            alt="Image"
            width={200}
            height={299.54}
            className="object-cover rounded-[6px]"
          />
        </div>
        <div className="flex flex-col lg:mt-[20px]">
          <h1 className="lg:text-[32px] font-semibold">{data.title}</h1>
          <div className="flex flex-row items-center gap-[10px] text-[12px] mt-1">
            <p>{data?.release_date}</p>
            <p>{data?.genres.map((genre) => genre.name).join(", ")}</p>
            <p>{formatRuntime(data?.runtime ?? 0)}</p>
          </div>
          <div className="flex flex-row gap-[20px] mt-2">
            <div className="flex flex-row gap-[10px] items-center">
              <CircularProgress userScore={userScore} />
              <p className="text-[8px] w-[10px]">User Score</p>
            </div>
            <div className="relative flex flex-row items-center">
              <div className="absolute top-[40px] left-[70px] flex flex-row gap-[10px]">
                <ToggleCard
                  id={data.id}
                  isFavorite={isFavorite}
                  isWatchlist={isWatchlist}
                  toggleFavorite={toggleFavorite}
                  toggleWatchlist={toggleWatchlist}
                  isLoggedIn={isLoggedIn}
                  handleProtectedAction={handleProtectedAction}
                />
              </div>
            </div>
          </div>
          <p className="text-[12px] mt-4">{data?.tagline}</p>
          <h1 className="mt-4">Overview</h1>
          <p className="text-[12px] w-[200px] lg:w-[800px] mt-2">
            {data?.overview}
          </p>
        </div>
      </div>
      <LoginPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
