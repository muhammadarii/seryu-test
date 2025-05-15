"use client";
import { MovieListPage } from "@/components/section/MovieListPage";

const WatchlistPage = () => {
  return (
    <div className="px-8 lg:px-[142px]">
      <MovieListPage type="watchlist" />
    </div>
  );
};

export default WatchlistPage;
