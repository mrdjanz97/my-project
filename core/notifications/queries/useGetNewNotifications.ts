import { useQuery } from '@tanstack/react-query';
import { getNewNotificationsCount } from '../notifications.service';
import { NEW_NOTIFICATIONS_QUERY_KEY } from './consts';

export const useGetNewNotifications = queryData => {
  const getNewNotificationsFunction = useQuery({
    queryKey: [NEW_NOTIFICATIONS_QUERY_KEY, queryData],
    queryFn: () => getNewNotificationsCount(queryData),
  });

  return getNewNotificationsFunction;
};
