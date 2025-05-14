export const LoaderCardMovie = () => {
  return (
    <div className="h-[355px] min-w-[193px] bg-gray-700 rounded-lg overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-600" />
      <div className="p-4">
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-600 rounded w-1/2" />
      </div>
    </div>
  );
};

export const LoaderDetailsMovie = () => {
  return (
    <div className="h-[400px] px-[142px] py-[50px] bg-gray-700">
      <div className="flex gap-5 items-center">
        <div className="w-[200px] h-[300px] bg-gray-600 rounded-md animate-pulse" />
        <div className="flex-1">
          <div className="h-8 bg-gray-600 rounded w-3/4 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-600 rounded w-1/2 mb-5 animate-pulse" />
          <div className="flex gap-3 mb-6 items-center">
            <div className="w-12 h-12 bg-gray-600 rounded-full animate-pulse" />
            <div className="w-20 h-8 bg-gray-600 rounded animate-pulse" />
          </div>
          <div className="h-4 bg-gray-600 rounded w-full mb-2 animate-pulse" />
          <div className="h-4 bg-gray-600 rounded w-full mb-2 animate-pulse" />
          <div className="h-4 bg-gray-600 rounded w-3/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
