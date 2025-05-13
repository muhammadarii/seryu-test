import { Movie, MovieResponse } from "@/types";
import axios from "axios";

export const fetchNowPlayingMovies = async (): Promise<MovieResponse> => {
  try {
    const response = await axios.get<MovieResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/now_playing`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
        params: {
          language: "en-US",
          page: 1,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  try {
    const response = await axios.get<Movie>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${movieId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        params: {
          language: "en-US",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchTopRatedMovies = async (): Promise<MovieResponse> => {
  try {
    const response = await axios.get<MovieResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/top_rated`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
        params: {
          language: "en-US",
          page: 1,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};
