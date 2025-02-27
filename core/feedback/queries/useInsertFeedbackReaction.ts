import { useMutation } from '@tanstack/react-query';
import { insertFeedbackReaction } from '../feedback.service';
import { AddFeedbackReactionProps } from '../feedback';

export const useInsertFeedbackReaction = () => {
  const insertFeedbackReactionMutation = useMutation({
    mutationFn: (data: AddFeedbackReactionProps) => insertFeedbackReaction(data),
  });

  const isLoading = insertFeedbackReactionMutation.isPending;
  const isError = insertFeedbackReactionMutation.isError;

  return [insertFeedbackReactionMutation, isLoading, isError] as const;
};
