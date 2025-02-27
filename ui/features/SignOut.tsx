import { FC } from 'react';
import { MainLayout } from '@src/lib/ui/components/layout';

export interface SignOutProps {}

export const SignOut: FC<SignOutProps> = () => {
  return (
    <MainLayout>
      <div>Signing Out</div>
    </MainLayout>
  );
};
