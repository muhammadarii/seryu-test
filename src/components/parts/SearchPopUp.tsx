"use client";

import { fetchSearchResults } from "@/lib/Api";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SearchResult {
  id: number;
  title: string;
  poster_path: string;
}

export const SearchPopUp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);

    try {
      fetchSearchResults(searchTerm).then((data) => {
        setResults(data);
        setShowPopup(true);
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      <div className="w-full rounded-2xl border border-gray-300 bg-white p-3 shadow-sm transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
        <input
          className="w-full border-none bg-transparent outline-none text-gray-700 placeholder-gray-400"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Search Results
            </h2>
            {isLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : results.length > 0 ? (
              <ul className="text-left space-y-2 max-h-[300px] overflow-y-auto">
                {results.map((item) => (
                  <Link key={item.id} href={`/movie/${item.id}`}>
                    <div className="flex flex-row items-center gap-2 mt-2">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.poster_path}`}
                        alt={item.title}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full"
                      />
                      <li className="text-black truncate w-[300px]">
                        {item.title}
                      </li>
                    </div>
                  </Link>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No results found.</p>
            )}
            <button
              onClick={closePopup}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
