import { useQuery } from '@tanstack/react-query';
import { FEEDBACKS_STATUS_COUNT_KEY } from './const/consts';
import { getFeedbacksStatusCount } from '../feedback.service';

export const useGetFeedbacksStatusCount = () => {
  const getFeedbacksFunction = useQuery({
    queryKey: [FEEDBACKS_STATUS_COUNT_KEY],
    queryFn: () => getFeedbacksStatusCount(),
  });

  return getFeedbacksFunction;
};
