import { Dashboard } from '@src/lib/ui/features/Dashboard';
import { Resources } from '@src/lib/ui/features/Resources';
import { SignOut } from '@src/lib/ui/features/SignOut';
import { Settings } from '@src/lib/ui/features/Settings';
import { Announcements } from '@src/lib/ui/features/Announcements';

export const NavigationRegistry = {
  dashboard: Dashboard,
  resources: Resources,
  announcements: Announcements,
  settings: Settings,
  logout: SignOut,
};
