import { Movie } from "@/types";
import { CardMovie } from "../parts/CardMovie";
import Link from "next/link";

interface RecomendationsListProps {
  data: Movie[];
  setSelectedMovieId: (id: number) => void;
}

export const RecomendationsList: React.FC<RecomendationsListProps> = ({
  data,
  setSelectedMovieId,
}) => {
  return (
    <div className="overflow-x-auto h-[450px] scroll-smooth snap-y snap-mandatory scrollbar-hide">
      <div className="flex flex-row gap-[20px]">
        {data.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <CardMovie
              onClick={() => setSelectedMovieId(movie.id)}
              title={movie.title}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
