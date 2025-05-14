import { NowPlayingList } from "@/components/section/NowPlayingList";
import { TopRatedList } from "@/components/section/TopRatedList";
import React from "react";

const Home = () => {
  return (
    <div className="px-8 lg:px-[142px] mt-[56px]">
      <h1 className="text-[24px] lg:text-[48px] font-semibold">Now Playing</h1>
      <NowPlayingList />
      <h1 className="text-[24px] lg:text-[48px] font-semibold">Top Rated</h1>
      <TopRatedList />
    </div>
  );
};

export default Home;
