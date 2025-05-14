"use client";
import { RecomendationsList } from "@/components/section/RecomendationsList";
import { fetchMovieDetails, fetchRecommendedMovies } from "@/lib/Api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import "react-circular-progressbar/dist/styles.css";
import { MovieDetails } from "@/components/section/MovieDetails";
import { useMovieStore } from "@/store/movieStore";
import { LoaderCardMovie, LoaderDetailsMovie } from "@/components/parts/Loader";

const DetailMoviePage = () => {
  const { id } = useParams();
  const movie_id = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["MovieDetails", movie_id],
    queryFn: () => fetchMovieDetails(movie_id ? parseInt(movie_id, 10) : 0),
    enabled: !!movie_id,
  });

  const { data: dataRecomendation } = useQuery({
    queryKey: ["Recomendations", movie_id],
    queryFn: () =>
      fetchRecommendedMovies(movie_id ? parseInt(movie_id, 10) : 0),
    enabled: !!movie_id,
  });

  const setSelectedMovieId = useMovieStore((state) => state.setSelectedMovieId);

  const userScore = Math.round((data?.vote_average ?? 0) * 10);
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (isLoading)
    return (
      <div className="flex flex-col gap-[20px]">
        <LoaderDetailsMovie />
        <div className="flex flex-row items-center justify-center gap-[20px] mt-10">
          {[...Array(6)].map((_, index) => (
            <LoaderCardMovie key={index} />
          ))}
        </div>
      </div>
    );
  if (error) return <p>Failed to load movie details</p>;

  return (
    <div>
      {data && (
        <MovieDetails
          data={data}
          formatRuntime={formatRuntime}
          userScore={userScore}
        />
      )}
      <div className="flex flex-col px-[142px] mt-[50px]">
        <h1 className="text-[20px] font-semibold">Recommendations</h1>
        <RecomendationsList
          data={dataRecomendation ?? []}
          setSelectedMovieId={setSelectedMovieId}
        />
      </div>
    </div>
  );
};

export default DetailMoviePage;
