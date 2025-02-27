import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeedbacks } from '../feedback.service';
import { FEEDBACKS_QUERY_KEY } from './const/consts';
import { GetFeedbacksParams } from '../feedback';
import { getNextPage, getPreviousPage } from '@root/src/lib/helper';

export const useGetFeedbacks = (queryData: GetFeedbacksParams) => {
  const getFeedbacksFunction = useInfiniteQuery({
    queryKey: [FEEDBACKS_QUERY_KEY, queryData],
    queryFn: ({ pageParam = 1 }) => getFeedbacks({ ...queryData, pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return getNextPage(lastPage, allPages);
    },
    getPreviousPageParam: firstPage => {
      return getPreviousPage(firstPage);
    },

    initialPageParam: 1,
  });

  return getFeedbacksFunction;
};
