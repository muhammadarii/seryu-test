"use client";
import { useQuery } from "@tanstack/react-query";
import { CardMovie } from "../parts/CardMovie";
import { fetchNowPlayingMovies } from "@/lib/Api";
import { useMovieStore } from "@/store/movieStore";
import Link from "next/link";
import { LoaderCardMovie } from "../parts/Loader";

export const NowPlayingList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["NowPlaying"],
    queryFn: fetchNowPlayingMovies,
  });

  const setSelectedMovieId = useMovieStore((state) => state.setSelectedMovieId);

  if (isLoading) {
    return (
      <div className="flex flex-row gap-[20px]">
        {[...Array(6)].map((_, index) => (
          <LoaderCardMovie key={index} />
        ))}
      </div>
    );
  }

  if (error) return <p>Failed to load movies</p>;

  return (
    <div className="overflow-x-auto h-[400px] scroll-smooth snap-y snap-mandatory scrollbar-hide">
      <div className="flex flex-row gap-[20px]">
        {data?.results.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <CardMovie
              onClick={() => setSelectedMovieId(movie.id)}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
              title={movie.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
