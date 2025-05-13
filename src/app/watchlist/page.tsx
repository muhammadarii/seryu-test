import Image from "next/image";
import React from "react";
import { CiBookmark, CiHeart } from "react-icons/ci";

const WatchlistPage = () => {
  return (
    <div className="px-[142px] mt-[56px]">
      <h1 className="text-[48px] font-semibold">Your Watchlist</h1>
      <div className="bg-[#050E12] w-[193.09px] h-[355.1px] rounded-[6px]">
        <div className="relative">
          <Image
            src="/movie.jpg"
            alt="Image"
            width={193}
            height={289}
            className="bg-red-500 rounded-t-[6px]"
          />
          <div className="flex flex-row absolute bottom-[10px] right-[10px] gap-[10px]">
            <CiBookmark size={25} />
            <CiHeart size={25} />
          </div>
        </div>
        <div className="px-[18px] py-[15px]">
          <h1 className="text-[18px] font-bold text-[#B6B6B6]">Judul Film</h1>
          <p className="text-[12px] font-normal text-[#828282]">2025</p>
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
