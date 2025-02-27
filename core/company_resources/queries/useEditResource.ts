import { useMutation } from '@tanstack/react-query';
import { editResource } from '../company_resources.service';

export const useEditResource = () => {
  const editResourceMutation = useMutation({
    mutationFn: (data: any) => editResource(data),
  });

  const isLoading = editResourceMutation.isPending;
  const isError = editResourceMutation.isError;

  return [editResourceMutation, isLoading, isError] as const;
};
