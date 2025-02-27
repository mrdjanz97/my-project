import { useMutation } from '@tanstack/react-query';
import { updateFeedback } from '../feedback.service';

export const useUpdateFeedback = () => {
  const updateFeedbackMutation = useMutation({
    mutationFn: (data: any) => updateFeedback(data),
  });

  const isLoading = updateFeedbackMutation.isPending;
  const isError = updateFeedbackMutation.isError;

  return [updateFeedbackMutation, isLoading, isError] as const;
};
