import axios from "axios";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
}

export interface NowPlayingResponse {
  results: Movie[];
}

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjIxZWY0NTgyMTRjNjU0MTIzNDQ5MjBmNGFjYWZlZiIsIm5iZiI6MTcyNDMyODMxMy4zNjIsInN1YiI6IjY2YzcyOTc5NjQ4MGFjZWZlM2VhYjg2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zoeRd4v2lypTvsVlMz1iAB6ROSvk5SjpuFMwI8M3VgE";

export const fetchNowPlayingMovies = async (): Promise<NowPlayingResponse> => {
  try {
    const response = await axios.get<NowPlayingResponse>(
      `${BASE_URL}/movie/now_playing`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
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
