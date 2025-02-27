import { useMutation } from '@tanstack/react-query';
import { insertResrouce } from '../company_resources.service';

export const useInsertResource = () => {
  const insertResourceMutation = useMutation({
    mutationFn: (data: any) => insertResrouce(data),
  });

  const isLoading = insertResourceMutation.isPending;
  const isError = insertResourceMutation.isError;

  return [insertResourceMutation, isLoading, isError] as const;
};
