"use client";

import { useEffect, useState } from "react";
import { useToggleCardStore } from "@/store/toggleCardStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { CardMovie } from "../parts/CardMovie";
import { useMovieStore } from "@/store/movieStore";
import Link from "next/link";
import { Movie } from "@/types";
import axios from "axios";
import { LoaderCardMovie } from "../parts/Loader";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

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

  const fetchMovies = async () => {
    try {
      const movieDetails = await Promise.all(
        movieIds.map(async (id) => {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
            {
              headers: {
                Authorization: `Bearer ${API_KEY}`,
              },
            }
          );
          return response.data;
        })
      );

      setMovies(movieDetails);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [movieIds]);

  const setSelectedMovieId = useMovieStore((state) => state.setSelectedMovieId);

  if (loading)
    return (
      <div className="flex flex-row gap-[20px]">
        {[...Array(6)].map((_, index) => (
          <LoaderCardMovie key={index} />
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
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <CardMovie
                  id={movie.id}
                  title={movie.title}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  onClick={() => {
                    setSelectedMovieId(movie.id);
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
