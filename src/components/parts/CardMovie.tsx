"use client";
import Image from "next/image";
import { CiBookmark, CiHeart } from "react-icons/ci";

interface CardMovieProps {
  onClick: () => void;
  title: string;
  src: string;
}

export const CardMovie: React.FC<CardMovieProps> = ({
  onClick,
  title,
  src,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#050E12] w-[193.09px] h-[355.1px] rounded-[6px]"
    >
      <div className="relative">
        <div className="w-[193px] h-[289px] relative rounded-t-[6px] overflow-hidden">
          <Image src={src} alt={title} fill className="object-cover" />
        </div>
        <div className="flex flex-row absolute bottom-[10px] right-[10px] gap-[10px]">
          <CiBookmark size={25} />
          <CiHeart size={25} />
        </div>
      </div>
      <div className="px-[18px] py-[15px]">
        <h1 className="text-[18px] font-bold text-[#B6B6B6]">{title}</h1>
        <p className="text-[12px] font-normal text-[#828282]">2025</p>
      </div>
    </div>
  );
};
