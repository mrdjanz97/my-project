import { useMutation } from '@tanstack/react-query';
import { insertFeedbackComment } from '../feedback.service';
import { AddFeedbackProps } from '../feedback';

export const useInsertFeedbackComment = () => {
  const insertCommentMutation = useMutation({
    mutationFn: (data: any) => insertFeedbackComment(data),
  });

  const isLoading = insertCommentMutation.isPending;
  const isError = insertCommentMutation.isError;

  return [insertCommentMutation, isLoading, isError] as const;
};
