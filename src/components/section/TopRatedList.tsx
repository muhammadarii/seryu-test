"use client";
import { useQuery } from "@tanstack/react-query";
import { CardMovie } from "../parts/CardMovie";
import { fetchTopRatedMovies } from "@/lib/Api";
import { useMovieStore } from "@/store/movieStore";
import { LoaderCardMovie } from "../parts/Loader";

export const TopRatedList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["TopRated"],
    queryFn: fetchTopRatedMovies,
  });

  const setSelectedMovieId = useMovieStore((state) => state.setSelectedMovieId);

  if (isLoading)
    return (
      <div className="flex flex-row gap-[20px]">
        {[...Array(6)].map((_, index) => (
          <LoaderCardMovie key={index} />
        ))}
      </div>
    );
  if (error) return <p>Failed to load movies</p>;

  return (
    <div>
      <div className="">
        <div className="grid grid-cols-6 gap-[20px]">
          {data?.results.map((movie) => (
            <CardMovie
              key={movie.id}
              id={movie.id}
              onClick={() => setSelectedMovieId(movie.id)}
              title={movie.title}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
