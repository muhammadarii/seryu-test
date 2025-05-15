import { MovieListPage } from "@/components/section/MovieListPage";
const FavoritePage = () => {
  return (
    <div className="px-8 lg:px-[142px]">
      <MovieListPage type="favorites" />
    </div>
  );
};

export default FavoritePage;
