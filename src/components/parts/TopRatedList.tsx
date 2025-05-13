"use client";
import { useQuery } from "@tanstack/react-query";
import { CardMovie } from "./CardMovie";
import { fetchTopRatedMovies } from "@/lib/api";
import { useMovieStore } from "@/store/movieStore";

export const TopRatedList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["TopRated"],
    queryFn: fetchTopRatedMovies,
  });

  const results = data?.results || [];

  const setSelectedMovieId = useMovieStore((state) => state.setSelectedMovieId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Failed to load movies</p>;

  return (
    <div>
      <div className="overflow-x-auto h-[450px] scroll-smooth snap-y snap-mandatory scrollbar-hide">
        <div className="flex flex-row gap-[20px]">
          {results.slice(0, 10).map((movie) => (
            <CardMovie
              key={movie.id}
              onClick={() => setSelectedMovieId(movie.id)}
              title={movie.title}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
        </div>
      </div>
      <div className="overflow-x-auto h-[400px] scroll-smooth snap-y snap-mandatory scrollbar-hide">
        <div className="flex flex-row gap-[20px]">
          {results.slice(10, 20).map((movie) => (
            <CardMovie
              key={movie.id}
              onClick={() => setSelectedMovieId(movie.id)}
              title={movie.title}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
