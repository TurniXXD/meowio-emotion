import { create } from 'zustand';

interface ArticlesCountStore {
  articlesCount: number;
  setArticlesCount: (count: number) => void;
  increase: () => void;
  decrease: () => void;
}

const useArticlesCountStore = create<ArticlesCountStore>((set) => ({
  articlesCount: 0,
  setArticlesCount: (articlesCount) => {
    set(() => ({
      articlesCount,
    }));
  },
  increase: () => {
    set((state) => ({
      articlesCount: state.articlesCount + 1,
    }));
  },
  decrease: () => {
    set((state) => ({
      articlesCount: state.articlesCount - 1,
    }));
  },
}));

export default useArticlesCountStore;
