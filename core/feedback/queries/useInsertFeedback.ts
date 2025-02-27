import { useMutation } from '@tanstack/react-query';
import { insertFeedback } from '../feedback.service';
import { AddFeedbackProps } from '../feedback';

export const useInsertFeedback = () => {
  const insertFeedbackMutation = useMutation({
    mutationFn: (data: AddFeedbackProps) => insertFeedback(data),
  });

  const isLoading = insertFeedbackMutation.isPending;
  const isError = insertFeedbackMutation.isError;

  return [insertFeedbackMutation, isLoading, isError] as const;
};
