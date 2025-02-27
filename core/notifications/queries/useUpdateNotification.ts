import { useMutation } from '@tanstack/react-query';
import { updateNotification } from '../notifications.service';

export const useUpdateNotification = () => {
  const updateNotificationMutation = useMutation({
    mutationFn: (data: any) => updateNotification(data),
  });

  const isLoading = updateNotificationMutation.isPending;
  const isError = updateNotificationMutation.isError;

  return [updateNotificationMutation, isLoading, isError] as const;
};
