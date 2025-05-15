export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  vote_average: number;
  runtime: number;
  genres: Genre[];
}

export interface MovieResponse {
  results: Movie[];
  page?: number;
  total_pages?: number;
  total_results?: number;
}

export interface CardMovieProps {
  onClick: () => void;
  title: string;
  src: string;
  id: number;
}

export interface MovieDetailsResponse {
  movie_id: number;
}
