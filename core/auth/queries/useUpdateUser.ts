import { useMutation } from '@tanstack/react-query';
import { updateUser } from '../auth.service';

export const useUpdateUser = () => {
  const updateFeedbackMutation = useMutation({
    mutationFn: (data: any) => updateUser(data),
  });

  const isLoading = updateFeedbackMutation.isPending;
  const isError = updateFeedbackMutation.isError;

  return [updateFeedbackMutation, isLoading, isError] as const;
};
