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

export const fetchNowPlayingMovies = async (): Promise<NowPlayingResponse> => {
  try {
    const response = await axios.get<NowPlayingResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/now_playing`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
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
