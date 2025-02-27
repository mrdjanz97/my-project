import React, { useState } from 'react';
import queryClient from '@root/src/lib/core/react-query/queryClient';
import {
  FEEDBACK_STATUS_UPDATED,
  FEEDBACK_STATUS_UPDATED_ERROR,
  REJECT_FEEDBACK_PLACEHOLDER,
  REJECT_FEEDBACK_TITLE,
} from './const';
import { useTranslation } from 'react-i18next';
import { CLOSE, SUBMIT } from '../common/const/consts';
import { useInsertFeedbackComment } from '@root/src/lib/core/feedback/queries/useInsertFeedbackComment';
import { useUpdateFeedback } from '@root/src/lib/core/feedback/queries/useUpdateFeedback';
import { FEEDBACKS_QUERY_KEY, FEEDBACKS_STATUS_COUNT_KEY } from '@root/src/lib/core/feedback/queries/const/consts';
import { FeedbackStatuses } from '@root/src/lib/core/feedback/feedback';
import { useInsertNotification } from '@root/src/lib/core/notifications/queries/useInsertNotification';
import { NOTIFICATION_STATUS, NOTIFICATION_TYPE } from '@root/src/lib/core/notifications/notification';
import { REJECT_FEEDBACK_MODAL_ID } from './const/manage_profile_modals';
import { useToastStore } from '@root/src/lib/core/toast/toast.store';
import { ToastSeverity } from '@root/src/lib/core/toast/toast';

const RejectFeedbackModal = ({ feedback }: any) => {
  const { t } = useTranslation();
  const { openToast } = useToastStore();
  const [insertFeedbackCommentMutation, isCommenting] = useInsertFeedbackComment();
  const [updateFeedbackMutation, isUpdating] = useUpdateFeedback();
  const [insertNotificationMutation, isNotifying] = useInsertNotification();
  const [rejectMessage, setRejectMessage] = useState('');

  const invalidateFeedbacks = () => {
    queryClient.invalidateQueries({ queryKey: [FEEDBACKS_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [FEEDBACKS_STATUS_COUNT_KEY] });
  };

  const onChangeHandler = e => {
    setRejectMessage(e.target.value);
  };

  const submitHandler = () => {
    insertFeedbackCommentMutation.mutateAsync(
      {
        comment: rejectMessage,
        feedbackId: feedback.id,
      },
      {
        onSuccess: () =>
          updateFeedbackMutation.mutateAsync(
            { status: FeedbackStatuses.REJECTED, feedbackId: feedback.id },
            {
              onSuccess: () => {
                if (feedback?.owner.id) {
                  insertNotificationMutation.mutateAsync({
                    status: NOTIFICATION_STATUS.FEEDBACK_REJECTED,
                    forUserId: feedback.owner.id,
                    type: NOTIFICATION_TYPE.INDIVIDUAL,
                    metadata: {
                      reject_message: rejectMessage,
                    },
                  });
                }
                openToast(
                  `${t(FEEDBACK_STATUS_UPDATED)} - ${t(`feedbacks.status.${FeedbackStatuses.REJECTED}`)} `,
                  ToastSeverity.SUCCESS,
                );
                invalidateFeedbacks();
              },
              onError: () => {
                openToast(t(FEEDBACK_STATUS_UPDATED_ERROR), ToastSeverity.ERROR);
              },
            },
          ),
      },
    );
  };
  const shouldSubmitButtonDisable = isCommenting || isUpdating || isNotifying || rejectMessage.length === 0;
  return (
    <>
      <dialog id={REJECT_FEEDBACK_MODAL_ID} className="modal open">
        <div className="modal-box gap-6 flex flex-col">
          <h3 className="font-bold text-lg">{t(REJECT_FEEDBACK_TITLE)}</h3>
          <form method="dialog" className="flex flex-col gap-4">
            <textarea placeholder={t(REJECT_FEEDBACK_PLACEHOLDER)} onChange={onChangeHandler} className="textarea" />
            <div className="flex gap-4 w-full justify-center">
              <button disabled={shouldSubmitButtonDisable} onClick={submitHandler} className="btn btn-primary w-[40%]">
                {t(SUBMIT)}
              </button>
              <button className="btn w-[40%]">{t(CLOSE)}</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default RejectFeedbackModal;
