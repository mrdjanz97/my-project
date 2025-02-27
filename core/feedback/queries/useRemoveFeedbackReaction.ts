import { useMutation } from '@tanstack/react-query';
import { deleteFeedbackReation } from '../feedback.service';
import { RemoveFeedbackReactionProps } from '../feedback';

export const useRemoveFeedbackReaction = () => {
  const removeFeedbackReactionMutation = useMutation({
    mutationFn: (data: RemoveFeedbackReactionProps) => deleteFeedbackReation(data),
  });

  const isLoading = removeFeedbackReactionMutation.isPending;
  const isError = removeFeedbackReactionMutation.isError;

  return [removeFeedbackReactionMutation, isLoading, isError] as const;
};
