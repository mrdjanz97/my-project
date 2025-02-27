import { FC } from 'react';
import { MainLayout } from '@src/lib/ui/components/layout';

export interface SettingsProps {}

export const Settings: FC<SettingsProps> = () => {
  return (
    <MainLayout>
      <div>Settings</div>
    </MainLayout>
  );
};
