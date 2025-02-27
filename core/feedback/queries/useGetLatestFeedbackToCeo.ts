import { useQuery } from '@tanstack/react-query';
import { LATEST_FEEDBACK_CEO_KEY } from './const/consts';
import { getLatestFeedbackToCeo } from '../feedback.service';

export const useGetLatestFeedbacToCeo = ({ currentUserId }) => {
  const getFeedbacksFunction = useQuery({
    queryKey: [LATEST_FEEDBACK_CEO_KEY, currentUserId],
    queryFn: () => getLatestFeedbackToCeo({ currentUserId }),
  });

  return getFeedbacksFunction;
};
