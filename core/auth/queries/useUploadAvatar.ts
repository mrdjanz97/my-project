import { useMutation } from '@tanstack/react-query';
import { uploadAvatar } from '../auth.service';

export const useUploadAvatar = () => {
  const uploadAvatarMutation = useMutation({
    mutationFn: ({ file }: { file: File }) => uploadAvatar({ file }),
  });

  const isLoading = uploadAvatarMutation.isPending;
  const isError = uploadAvatarMutation.isError;

  return [uploadAvatarMutation, isLoading, isError] as const;
};
