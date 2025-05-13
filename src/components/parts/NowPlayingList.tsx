"use client";
import { useQuery } from "@tanstack/react-query";
import { CardMovie } from "./CardMovie";
import { fetchNowPlayingMovies } from "@/lib/api";
import { useMovieStore } from "@/store/movieStore";
import Link from "next/link";

export const NowPlayingList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["NowPlaying"],
    queryFn: fetchNowPlayingMovies,
  });

  const setSelectedMovieId = useMovieStore((state) => state.setSelectedMovieId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Failed to load movies</p>;

  return (
    <div className="overflow-x-auto h-[400px] scroll-smooth snap-y snap-mandatory scrollbar-hide">
      <div className="flex flex-row gap-[20px]">
        {data?.results.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <CardMovie
              key={movie.id}
              onClick={() => setSelectedMovieId(movie.id)}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
