import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteStore = {
  favorites: number[];
  watchlist: number[];
  toggleFavorite: (id: number) => void;
  toggleWatchlist: (id: number) => void;
  isFavorite: (id: number) => boolean;
  isWatchlist: (id: number) => boolean;
};

export const useToggleCardStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],
      toggleFavorite: (id: number) => {
        const { favorites } = get();
        const updated = favorites.includes(id)
          ? favorites.filter((favId) => favId !== id)
          : [...favorites, id];
        set({ favorites: updated });
      },
      toggleWatchlist: (id: number) => {
        const { watchlist } = get();
        const updated = watchlist.includes(id)
          ? watchlist.filter((wlId) => wlId !== id)
          : [...watchlist, id];
        set({ watchlist: updated });
      },
      isFavorite: (id: number) => get().favorites.includes(id),
      isWatchlist: (id: number) => get().watchlist.includes(id),
    }),
    {
      name: "movie-preferences",
    }
  )
);
