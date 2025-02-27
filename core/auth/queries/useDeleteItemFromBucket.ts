import { useMutation } from '@tanstack/react-query';
import { deleteItemFromBucket } from '../auth.service';

export const useDeleteItemFromBucket = () => {
  const deleteItemMutation = useMutation({
    mutationFn: (data: any) => deleteItemFromBucket(data),
  });

  const isLoading = deleteItemMutation.isPending;
  const isError = deleteItemMutation.isError;

  return [deleteItemMutation, isLoading, isError] as const;
};
