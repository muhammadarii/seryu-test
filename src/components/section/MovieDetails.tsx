// import { Movie } from "@/types";
import { Movie } from "@/types";
import Image from "next/image";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { CircularProgress } from "../parts/CircularProgress";

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
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.backdrop_path}`}
        alt="Image"
        fill
        className="object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
      <div className="absolute top-[50px] left-[142px] flex flex-row gap-[20px]">
        <div className="w-[200px] h-[299.54px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.poster_path}`}
            alt="Image"
            width={200}
            height={299.54}
            className="object-cover rounded-[6px]"
          />
        </div>
        <div className="flex flex-col mt-[20px]">
          <h1 className="text-[32px] font-semibold">{data.title}</h1>
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
            <div className="flex flex-row items-center">
              <CiBookmark size={25} />
              <CiHeart size={25} />
            </div>
          </div>
          <p className="text-[12px] mt-4">{data?.tagline}</p>
          <h1 className="mt-4">Overview</h1>
          <p className="text-[12px] w-[800px] mt-2">{data?.overview}</p>
        </div>
      </div>
    </div>
  );
};
