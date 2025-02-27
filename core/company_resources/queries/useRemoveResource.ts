import { useMutation } from '@tanstack/react-query';
import { removeResource } from '../company_resources.service';

export const useRemoveResource = () => {
  const removeResourceMutation = useMutation({
    mutationFn: (id: any) => removeResource(id),
  });

  const isLoading = removeResourceMutation.isPending;
  const isError = removeResourceMutation.isError;

  return [removeResourceMutation, isLoading, isError] as const;
};
