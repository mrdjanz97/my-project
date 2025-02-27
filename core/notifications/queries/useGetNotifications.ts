import { useInfiniteQuery } from '@tanstack/react-query';
import { NOTIFICATIONS_QUERY_KEY } from './consts';
import { getNotifications } from '../notifications.service';
import { getNextPage, getPreviousPage } from '@root/src/lib/helper';

export const useGetNotifications = ({currentUserId}) => {
  const getNotificationsQuery = useInfiniteQuery({
    queryKey: [NOTIFICATIONS_QUERY_KEY, currentUserId],
    queryFn: ({ pageParam = 1 }) => getNotifications({ currentUserId, pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return getNextPage(lastPage, allPages);
    },
    getPreviousPageParam: firstPage => {
      return getPreviousPage(firstPage);
    },

    initialPageParam: 1,
  });

  return getNotificationsQuery;
};
