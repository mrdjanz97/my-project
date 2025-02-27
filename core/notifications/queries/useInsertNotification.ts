import { useMutation } from '@tanstack/react-query';
import { insertNotification } from '../notifications.service';

export const useInsertNotification = () => {
  const insertNotificationMutation = useMutation({
    mutationFn: (data: any) => insertNotification(data),
  });

  const isLoading = insertNotificationMutation.isPending;
  const isError = insertNotificationMutation.isError;

  return [insertNotificationMutation, isLoading, isError] as const;
};
