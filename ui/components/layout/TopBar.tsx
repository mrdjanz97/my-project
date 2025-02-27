import { FC } from 'react';
import { useUsersStore } from '@src/lib/core/auth/auth.store';
import { Logo } from '@root/src/assets/icons';
import { SearchBar } from '@root/src/lib/ui/components/common';
import { Avatar } from '../common';
import ManageProfile from '../dashboard/ManageProfile';
import Notifications from '../common/Notifications';
import Internationalization from '../common/Internationalization';

export interface TopBarProps {}

export const TopBar: FC<TopBarProps> = () => {
  const { profile } = useUsersStore(state => state);

  return (
    <div className="flex items-center gap-3 justify-between !z-[9999]">
      <div className="px-6 text-lg text-black">
        <Logo />
      </div>
      <div className="flex items-center gap-8">
        <SearchBar />
        <div className="flex gap-2 items-center">
          <Internationalization />
          <Notifications />
          <Avatar avatarUrl={profile.avatar} firstName={profile?.first_name} lastName={profile?.last_name} />
          <div className="flex flex-col items-start">
            <p className="text-xl">
              {profile?.first_name} {profile?.last_name}
            </p>
            <p className="text-secondary font-light">danilo.kis@gmail.com</p>
          </div>
          <ManageProfile />
        </div>
      </div>
    </div>
  );
};
