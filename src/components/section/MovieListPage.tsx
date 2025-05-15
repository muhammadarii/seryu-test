"use client";

import { useEffect, useState } from "react";
import { useToggleCardStore } from "@/store/toggleCardStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { CardMovie } from "../parts/CardMovie";
import { useMovieStore } from "@/store/movieStore";
import { Movie } from "@/types";
// import axios from "axios";
import { LoaderCardMovie } from "../parts/Loader";
import { fetchMovieList } from "@/lib/Api";

interface MovieListPageProps {
  type: "favorites" | "watchlist";
}

export const MovieListPage: React.FC<MovieListPageProps> = ({ type }) => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { favorites, watchlist } = useToggleCardStore();

  const movieIds = type === "favorites" ? favorites : watchlist;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
      return;
    }
  }, [isLoggedIn, router]);

  const ListMovies = async () => {
    try {
      const movieList = await Promise.all(
        movieIds.map((id) => fetchMovieList(id))
      );
      setMovies(movieList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  useEffect(() => {
    ListMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieIds]);

  const setSelectedMovieId = useMovieStore((state) => state.setSelectedMovieId);

  if (loading)
    return (
      <div className="flex flex-row gap-[20px]">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="mt-10">
            <LoaderCardMovie />
          </div>
        ))}
      </div>
    );

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4 capitalize">{type} Movies</h1>
      {movies.length === 0 ? (
        <p>Tidak ada film dalam {type} kamu.</p>
      ) : (
        <div className="overflow-x-auto h-[400px] scroll-smooth snap-y snap-mandatory scrollbar-hide">
          <div className="flex flex-row gap-[20px]">
            {movies.map((movie) => (
              <CardMovie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                onClick={() => {
                  setSelectedMovieId(movie.id);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
