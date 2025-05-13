export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
}

export interface MovieResponse {
  results: Movie[];
}

export interface CardMovieProps {
  onClick: () => void;
  title: string;
  src: string;
}
