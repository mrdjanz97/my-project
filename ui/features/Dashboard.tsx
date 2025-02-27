import { FC, useState } from 'react';
import { MainLayout } from '@src/lib/ui/components/layout/MainLayout';
import { FeedbackInfo, AddFeedback, FeedbackList } from '@src/lib/ui/components/dashboard';
import CompanyResources from '../components/dashboard/CompanyResources';
import { useUsersStore } from '../../core/auth/auth.store';

export interface DashboardProps {}

export const Dashboard: FC<DashboardProps> = () => {
  const [isAddFeedbackOpen, setIsAddFeedbackOpen] = useState(false);
  const { role } = useUsersStore(s => s.profile.company_roles[0].role);
  const closeFeedback = () => {
    setIsAddFeedbackOpen(false);
  };

  const openFeedback = () => {
    setIsAddFeedbackOpen(true);
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-12 gap-6 h-full">
        <div className="flex flex-col gap-2 col-span-12 lg:col-span-8 h-full order-2 lg:order-1">
          <FeedbackInfo isAddFeedbackOpen={isAddFeedbackOpen} openFeedback={openFeedback} role={role} />
          <div className="divider"></div>
          <div className="flex flex-col">{isAddFeedbackOpen && <AddFeedback closeFeedback={closeFeedback} />}</div>
          <FeedbackList />
        </div>
        <div className="flex flex-col gap-6 col-span-12 lg:col-span-4 order-1 lg:order-2">
          <CompanyResources />
        </div>
      </div>
    </MainLayout>
  );
};
