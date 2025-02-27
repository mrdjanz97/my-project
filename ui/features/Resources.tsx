import { FC } from 'react';
import { MainLayout } from '@src/lib/ui/components/layout';

export interface FilesProps {}

export const Resources: FC<FilesProps> = () => {
  return (
    <MainLayout>
      <div>Files</div>
    </MainLayout>
  );
};
