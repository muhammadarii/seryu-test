import { NowPlayingList } from "@/components/parts/NowPlayingList";
import React from "react";

const Home = () => {
  return (
    <div className="px-8 lg:px-[142px] mt-[56px]">
      <h1 className="text-[24px] lg:text-[48px] font-semibold">Now Playing</h1>
      <NowPlayingList />
      <h1 className="text-[24px] lg:text-[48px] font-semibold">Top Rated</h1>
      <div className="overflow-x-auto h-[400px] scroll-smooth snap-y snap-mandatory scrollbar-hide">
        <div className="flex flex-row gap-[20px]">{/* <CardMovie /> */}</div>
      </div>
      <div className="overflow-x-auto h-[400px] scroll-smooth snap-y snap-mandatory scrollbar-hide">
        <div className="flex flex-row gap-[20px]">{/* <CardMovie /> */}</div>
      </div>
    </div>
  );
};

export default Home;
