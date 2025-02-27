import { NavEntry } from '@src/lib/core/nav/nav-entry';
import { Adjustments, Files, Home, Logout, Volume2 } from '@src/lib/ui/icons';

const items: NavEntry[] = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'resources', label: 'Company Resources', icon: Files },
  { key: 'announcements', label: 'Announcements', icon: Volume2 },
  { key: 'settings', label: 'Settings', icon: Adjustments },
  { key: 'logout', label: 'Sign Out', icon: Logout },
];

export const getNavigationEntries = async () => {
  return items;
};

export const getNavigationEntry = async (key: string) => {
  return items.find(e => e.key === key);
};
