import { create } from 'zustand';
import { NavEntry } from '@src/lib/core/nav/nav-entry';
import { getNavigationEntries, getNavigationEntry } from '@src/lib/core/nav/nav.service';

const HOME_KEY = 'dashboard';

export interface NavigationState {
  entries: NavEntry[];
  selection: NavEntry;
  load: () => void;
  navigate: (key: string) => void;
  goHome: () => void;
  isCurrent: (key: string) => boolean;
}

export const useNav = create<NavigationState>((set, get) => ({
  entries: [],
  selection: undefined,
  load: async () => {
    const entries = await getNavigationEntries();
    const selection = await getNavigationEntry(HOME_KEY);
    set({ entries, selection });
  },
  navigate: (key: string) => {
    getNavigationEntry(key).then(e => {
      set({ selection: e });
    });
  },
  goHome: () => {
    getNavigationEntry(HOME_KEY).then(e => set({ selection: e }));
  },
  isCurrent: (key: string): boolean => {
    const selection = get().selection;
    return selection && key === selection.key;
  },
}));
