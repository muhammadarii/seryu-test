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
  results: result[];
}

interface result {
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

interface Genre {
  id: number;
  name: string;
}

export interface MovieResponse {
  results: Movie[];
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
