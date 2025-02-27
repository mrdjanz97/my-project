import { useMutation } from '@tanstack/react-query';
import { uploadResource } from '../company_resources.service';

export const useUploadResource = () => {
  const uploadResourceMutation = useMutation({
    mutationFn: ({ file }: { file: File }) => uploadResource({ file }),
  });

  const isLoading = uploadResourceMutation.isPending;
  const isError = uploadResourceMutation.isError;

  return [uploadResourceMutation, isLoading, isError] as const;
};
