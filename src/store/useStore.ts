import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { League, UserPreferences } from '../types';

interface AppStore extends UserPreferences {
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  addFavoriteTeam: (teamId: string) => void;
  removeFavoriteTeam: (teamId: string) => void;
  toggleFavoriteTeam: (teamId: string) => void;
  addPreferredLeague: (league: League) => void;
  removePreferredLeague: (league: League) => void;
  toggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      favoriteTeams: [],
      preferredLeagues: [],
      bookmarkedArticles: [],
      recentSearches: [],

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },

      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark';
        set({ theme: newTheme });
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      },

      addFavoriteTeam: (teamId) =>
        set((state) => ({
          favoriteTeams: [...state.favoriteTeams, teamId],
        })),

      removeFavoriteTeam: (teamId) =>
        set((state) => ({
          favoriteTeams: state.favoriteTeams.filter((id) => id !== teamId),
        })),

      toggleFavoriteTeam: (teamId) => {
        const { favoriteTeams } = get();
        if (favoriteTeams.includes(teamId)) {
          set({ favoriteTeams: favoriteTeams.filter((id) => id !== teamId) });
        } else {
          set({ favoriteTeams: [...favoriteTeams, teamId] });
        }
      },

      addPreferredLeague: (league) =>
        set((state) => ({
          preferredLeagues: [...state.preferredLeagues, league],
        })),

      removePreferredLeague: (league) =>
        set((state) => ({
          preferredLeagues: state.preferredLeagues.filter((l) => l !== league),
        })),

      toggleBookmark: (articleId) => {
        const { bookmarkedArticles } = get();
        if (bookmarkedArticles.includes(articleId)) {
          set({ bookmarkedArticles: bookmarkedArticles.filter((id) => id !== articleId) });
        } else {
          set({ bookmarkedArticles: [...bookmarkedArticles, articleId] });
        }
      },

      isBookmarked: (articleId) => get().bookmarkedArticles.includes(articleId),

      addRecentSearch: (query) =>
        set((state) => ({
          recentSearches: [
            query,
            ...state.recentSearches.filter((s) => s !== query),
          ].slice(0, 10),
        })),

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'soccer-hub-storage',
    }
  )
);
