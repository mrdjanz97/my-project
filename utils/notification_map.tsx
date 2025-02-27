import { ReactNode } from 'react';
import { NOTIFICATION_STATUS } from '../core/notifications/notification';
import { FEEDBACK_REJECTED_TITLE, RESOURCE_CREATED_TITLE } from '../ui/components/dashboard/const/notification';

interface NotificationMapping {
  [key: string]: { title: string; content?: (metadata: any) => ReactNode };
}

export const notificationMapping: NotificationMapping = {
  [NOTIFICATION_STATUS.FEEDBACK_CREATED]: {
    title: NOTIFICATION_STATUS.FEEDBACK_CREATED,
    // content: metadata => <></>,
  },
  [NOTIFICATION_STATUS.RESOURCE_CREATED]: {
    title: RESOURCE_CREATED_TITLE,
    content: metadata => (
      <pre className="font-poppins break-words truncate hover:text-clip hover:whitespace-normal hover:cursor-pointer">
        {metadata.resource_name}
      </pre>
    ),
  },

  [NOTIFICATION_STATUS.FEEDBACK_REJECTED]: {
    title: FEEDBACK_REJECTED_TITLE,
    content: metadata => (
      <pre className="font-poppins break-words truncate hover:text-clip hover:whitespace-normal hover:cursor-pointer">
        {metadata.reject_message}
      </pre>
    ),
  },
};
