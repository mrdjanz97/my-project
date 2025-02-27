import { CheckmarkIcon, XIcon } from '@root/src/assets/icons';
import { FeedbackStatuses } from '../core/feedback/feedback';
import { ReactNode } from 'react';

interface StatusMapping {
  [key: string]: (status: string) => ReactNode;
}

export const statusMapping: StatusMapping = {
  [FeedbackStatuses.PENDING]: status => (
    <div className="badge badge-info gap-2 flex items-baseline pt-1.5 pb-1 px-3.5 h-auto">
      <span className="text-white">{status}</span>
    </div>
  ),

  [FeedbackStatuses.RESOLVED]: status => (
    <div className="badge badge-success gap-2 flex items-baseline pt-1.5 pb-1 px-3.5 h-auto">
      <CheckmarkIcon />
      <span className="text-white">{status}</span>
    </div>
  ),
  [FeedbackStatuses.UNRESOLVED]: status => (
    <div className="badge badge-warning gap-2 flex items-baseline pt-1.5 pb-1 px-3.5 h-auto">
      <XIcon />
      <span className="text-white">{status}</span>
    </div>
  ),
  [FeedbackStatuses.REJECTED]: status => (
    <div className="badge badge-error gap-2 flex items-baseline pt-1.5 pb-1 px-3.5 h-auto">
      <XIcon />
      <span className="text-white">{status}</span>
    </div>
  ),
};
