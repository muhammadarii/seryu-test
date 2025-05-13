import { create } from "zustand";

interface MovieState {
  selectedMovieId: number | null;
  setSelectedMovieId: (id: number | null) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  selectedMovieId: null,
  setSelectedMovieId: (id) => set({ selectedMovieId: id }),
}));
