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

export const fetchMovieDetails = async (movie_id: number): Promise<Movie> => {
  try {
    const response = await axios.get<Movie>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${movie_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
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

export const fetchRecommendedMovies = async (
  movie_id: number
): Promise<Movie[]> => {
  try {
    const response = await axios.get<MovieResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${movie_id}/recommendations`,
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

    return response.data.results;
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    throw error;
  }
};

export const fetchMovieList = async (id: number): Promise<Movie> => {
  try {
    const response = await axios.get<Movie>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie list:", error);
    throw error;
  }
};
