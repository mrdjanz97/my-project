import { FC } from 'react';
import { MainLayout } from '@src/lib/ui/components/layout';

export interface AnnouncementsProps {}

export const Announcements: FC<AnnouncementsProps> = () => {
  return (
    <MainLayout>
      <div>Announcements</div>
    </MainLayout>
  );
};
