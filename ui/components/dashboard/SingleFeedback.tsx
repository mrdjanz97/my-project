import queryClient from '@root/src/lib/core/react-query/queryClient';
import { useUsersStore } from '@root/src/lib/core/auth/auth.store';
import { useInsertFeedbackReaction } from '@root/src/lib/core/feedback/queries/useInsertFeedbackReaction';
import { useRemoveFeedbackReaction } from '@root/src/lib/core/feedback/queries/useRemoveFeedbackReaction';
import { formatDateString } from '@root/src/lib/utils/formatted_date';
import { FEEDBACKS_QUERY_KEY, FEEDBACKS_STATUS_COUNT_KEY } from '@root/src/lib/core/feedback/queries/const/consts';
import { Feedback, FeedbackStatuses, ReactionType } from '@root/src/lib/core/feedback/feedback';
import {
  CalendarIcon,
  DislikeIcon,
  LikeIcon,
  RejectedIcon,
  ResolvedIcon,
  UnresolvedIcon,
} from '@root/src/assets/icons';
import { Avatar } from '../common';
import { statusMapping } from '@root/src/lib/utils';
import { useTranslation } from 'react-i18next';
import {
  ANONYMOUS_FEEDBACK,
  FEEDBACK_STATUS_UPDATED,
  FEEDBACK_STATUS_UPDATED_ERROR,
  HIDE_COMMENT,
  REJECTED_REASON,
  SHOW_COMMENT,
} from './const';
import { useUpdateFeedback } from '@root/src/lib/core/feedback/queries/useUpdateFeedback';
import RejectFeedbackModal from './RejectFeedbackModal';
import { REJECT_FEEDBACK_MODAL_ID } from './const/manage_profile_modals';
import { UserRoles } from '../common/const/consts';
import { useState } from 'react';
import { useToastStore } from '@root/src/lib/core/toast/toast.store';
import { ToastSeverity } from '@root/src/lib/core/toast/toast';

const possibleFeedbackStatuses = [
  {
    value: FeedbackStatuses.RESOLVED,
    icon: () => <ResolvedIcon />,
  },
  {
    value: FeedbackStatuses.UNRESOLVED,
    icon: () => <UnresolvedIcon />,
  },
  {
    value: FeedbackStatuses.REJECTED,
    icon: () => <RejectedIcon />,
  },
];

const SingleFeedback = ({ feedback, isOddIndex }: { feedback: Feedback; isOddIndex: boolean }) => {
  const { t } = useTranslation();
  const { openToast } = useToastStore();
  const { id: currentUserId } = useUsersStore(s => s.user.user);
  const { role } = useUsersStore(s => s.profile.company_roles[0].role);

  const [insertFeedbackReactionMutation, isReactingToFeedbackLoading] = useInsertFeedbackReaction();
  const [removeFeedbackReactionMutation, isRemovingReactionLoading] = useRemoveFeedbackReaction();
  const [updateFeedbackMutation, isUpdatingFeedback] = useUpdateFeedback();

  const alreadyReacted = (reaction: ReactionType) => {
    return feedback.user_reacted === reaction;
  };

  const invalidateFeedbacks = () => {
    queryClient.invalidateQueries({ queryKey: [FEEDBACKS_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [FEEDBACKS_STATUS_COUNT_KEY] });
  };

  const feedbackReactHandler = async (reaction: ReactionType) => {
    if (feedback.user_reacted !== null) {
      removeFeedbackReactionMutation.mutateAsync(
        { reactionId: feedback.user_reaction_id },
        {
          onSettled: () => invalidateFeedbacks(),
        },
      );
    }
    if (feedback.user_reacted === reaction) {
      return;
    }

    insertFeedbackReactionMutation.mutateAsync(
      { feedbackId: feedback.id, reaction, userId: currentUserId },
      {
        onSettled: () => invalidateFeedbacks(),
      },
    );
  };

  const showSpinner = () => {
    return (
      <div className="self-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  };

  const showModalHandler = (modalId: string) => {
    if (document) (document.getElementById(modalId) as HTMLFormElement).showModal();
  };

  const reactHandlerWithInvalidate = async (reaction: ReactionType) => {
    await feedbackReactHandler(reaction);
    invalidateFeedbacks();
  };
  const getStatusTranslation = status => {
    return t(`feedbacks.status.${status}`);
  };

  const renderStatusOptions = () => {
    return possibleFeedbackStatuses.map(status => (
      <button
        key={status.value}
        className="btn flex gap-3 items-center justify-start"
        onClick={() => {
          if (status.value === FeedbackStatuses.REJECTED) {
            showModalHandler(REJECT_FEEDBACK_MODAL_ID);
            return;
          }
          updateFeedbackMutation.mutateAsync(
            { status: status.value, feedbackId: feedback.id },
            {
              onSuccess: () => {
                invalidateFeedbacks();
                openToast(
                  `${t(FEEDBACK_STATUS_UPDATED)} - ${t(`feedbacks.status.${status.value}`)} `,
                  ToastSeverity.SUCCESS,
                );
              },
              onError: () => {
                openToast(
                  `${t(FEEDBACK_STATUS_UPDATED_ERROR)} - ${t(`feedbacks.status.${status.value}`)} `,
                  ToastSeverity.ERROR,
                );
              },
            },
          );
        }}>
        {status.icon()}
        <p> {getStatusTranslation(status.value)}</p>
      </button>
    ));
  };

  const renderStatusLabel = () => {
    const renderFunction = statusMapping[feedback.status];
    if (role === UserRoles.HR) {
      return (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            {renderFunction(getStatusTranslation(feedback.status))}
          </div>
          {isUpdatingFeedback ? (
            showSpinner()
          ) : (
            <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow flex flex-col">
              {renderStatusOptions()}
            </div>
          )}
        </div>
      );
    }
    return renderFunction(getStatusTranslation(feedback.status));
  };

  const shouldReactionButtonDisable = isReactingToFeedbackLoading || isRemovingReactionLoading;
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const renderFeedbackComment = () => {
    return (
      feedback.comments && (
        <div className="flex flex-col gap-2">
          <button onClick={() => setIsCommentOpen(!isCommentOpen)} className="btn max-w-[150px]">
            {isCommentOpen ? t(HIDE_COMMENT) : t(SHOW_COMMENT)}
          </button>
          {isCommentOpen && (
            <pre className="w-full max-w-[80%] whitespace-pre-wrap font-poppins">
              {t(REJECTED_REASON)} <br />
              {feedback?.comments[0]?.comment}
            </pre>
          )}
        </div>
      )
    );
  };

  return (
    <>
      <div
        key={feedback.id}
        className={`p-6 flex flex-col w-full ${isOddIndex ? 'bg-white' : 'bg-primary'} rounded-xl gap-2`}>
        <div className="flex justify-between items-center">
          {feedback.is_anonymous ? (
            <p>{t(ANONYMOUS_FEEDBACK)}</p>
          ) : (
            <div className="flex gap-2 items-center">
              <Avatar
                size="8"
                firstName={feedback.owner.first_name}
                lastName={feedback.owner.last_name}
                avatarUrl={feedback.owner.avatar}
              />
              <p>{`${feedback.owner.first_name} ${feedback.owner.last_name}`}</p>
            </div>
          )}
          {renderStatusLabel()}
        </div>

        <pre className="w-full max-w-[80%] whitespace-pre-wrap font-poppins">{feedback.content}</pre>
        {renderFeedbackComment()}
        <div className="flex justify-between items-end">
          <div className="flex gap-1 items-start">
            <CalendarIcon />
            <p className="text-sm text-gray-500">{formatDateString(feedback.created_at, t)}</p>
          </div>
          <div className="flex gap-4">
            <button
              disabled={shouldReactionButtonDisable}
              onClick={() => reactHandlerWithInvalidate(ReactionType.UP)}
              className="btn bg-white flex items-center">
              <LikeIcon alreadyReacted={alreadyReacted(ReactionType.UP)} />
              <p>{feedback.up_count}</p>
            </button>
            <button
              disabled={shouldReactionButtonDisable || isRemovingReactionLoading}
              onClick={() => reactHandlerWithInvalidate(ReactionType.DOWN)}
              className="btn bg-white flex items-center">
              <DislikeIcon alreadyReacted={alreadyReacted(ReactionType.DOWN)} />
              <p>{feedback.down_count}</p>
            </button>
          </div>
        </div>
      </div>
      <RejectFeedbackModal feedback={feedback} />
    </>
  );
};

export default SingleFeedback;
