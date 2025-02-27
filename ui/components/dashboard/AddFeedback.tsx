import React, { FC, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { useUsersStore } from '@root/src/lib/core/auth/auth.store';
import { useInsertFeedback } from '@root/src/lib/core/feedback/queries/useInsertFeedback';
import { validateFeedbackInputText } from './validation/feedback';
import {
  FEEDBACKS_QUERY_KEY,
  FEEDBACKS_STATUS_COUNT_KEY,
  LATEST_FEEDBACK_CEO_KEY,
} from '@root/src/lib/core/feedback/queries/const/consts';
import { DropdownArrowIcon } from '@root/src/assets/icons';
import { FeedbackVisibility } from '@root/src/lib/core/feedback/feedback';
import queryClient from '@root/src/lib/core/react-query/queryClient';
import {
  ADD_NEW_FEEDBACK_PLACEHOLDER,
  CANCEL_FEEDBACK,
  FEEDBACK_ERROR_POST,
  FEEDBACK_SUCCESS_POST,
  LEAVE_ANONYMOUS,
  SEND_FEEDBACK,
  TO_ADMINISTRATION,
  TO_CEO,
  TO_GENERAL,
} from './const';
import { useTranslation } from 'react-i18next';
import { useGetLatestFeedbacToCeo } from '@root/src/lib/core/feedback/queries/useGetLatestFeedbackToCeo';
import { calculateIsAvailableFeedbackToCeo } from '@root/src/lib/helper/calculate_feedback_available_ceo.helper';
// import { useInsertNotification } from '@root/src/lib/core/notifications/queries/useInsertNotification';
import { useToastStore } from '@root/src/lib/core/toast/toast.store';
import { ToastSeverity } from '@root/src/lib/core/toast/toast';

interface AddFeedbackProps {
  closeFeedback: () => void;
}

export const AddFeedback: FC<AddFeedbackProps> = ({ closeFeedback }) => {
  const { t } = useTranslation();
  const { openToast } = useToastStore();
  const user = useUsersStore(state => state.user);

  const [isAvailabeToCeo, setIsAvailableToCeo] = useState(true);

  const initialValues = {
    content: '',
    isAnonymous: false,
    visibility: FeedbackVisibility.General,
  };

  const [insertFeedbackMutation] = useInsertFeedback();
  // const [insertNotificationMutation] = useInsertNotification();

  const invalidateFeedbacks = async () => {
    await queryClient.invalidateQueries({ queryKey: [FEEDBACKS_QUERY_KEY] });
    await queryClient.invalidateQueries({ queryKey: [FEEDBACKS_STATUS_COUNT_KEY] });
    await queryClient.invalidateQueries({ queryKey: [LATEST_FEEDBACK_CEO_KEY, user.user.id] });
  };

  const { data: latestCeoFeedback } = useGetLatestFeedbacToCeo({ currentUserId: user?.user?.id });

  useEffect(() => {
    const isAvailable = calculateIsAvailableFeedbackToCeo(latestCeoFeedback?.created_at);
    setIsAvailableToCeo(isAvailable);
  }, [latestCeoFeedback]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateFeedbackInputText}
      onSubmit={async (values, { resetForm }) => {
        insertFeedbackMutation.mutateAsync(
          { ...values, ownerId: user.user.id },
          {
            onSettled: async () => {
              await invalidateFeedbacks();
              openToast(t(FEEDBACK_SUCCESS_POST), ToastSeverity.SUCCESS);
              resetForm();
              closeFeedback();
            },
            onError: () => {
              openToast(t(FEEDBACK_ERROR_POST), ToastSeverity.ERROR);
            },
          },
        );
      }}>
      {({ isSubmitting, values, handleChange, setFieldValue }) => (
        <Form className="flex flex-col gap-2">
          <textarea
            name="content"
            rows={6}
            onChange={handleChange}
            placeholder={t(ADD_NEW_FEEDBACK_PLACEHOLDER)}
            className="textarea textarea-xl border-base-300 text-xl w-full placeholder:text-gray-500 bg-base-200"
          />
          <div className="flex justify-between">
            <div className="form-control flex">
              <label className="label cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  name="isAnonymous"
                  onChange={handleChange}
                  className="checkbox checkbox-accent text-white [--chkbg:theme(white)] [--chkfg:white]"
                />
                <span className="label-text text-lg font-bold">{t(LEAVE_ANONYMOUS)}</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={closeFeedback} className="btn-primary btn text-lg font-semibold rounded-xl">
                {t(CANCEL_FEEDBACK)}
              </button>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 flex justify-between btn-accent text-white text-lg font-semibold rounded-xl gap-2">
                  <p>{t(SEND_FEEDBACK)}</p>
                  <DropdownArrowIcon />
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <button
                    disabled={isSubmitting || !values.content}
                    className="btn items-center"
                    onClick={() => {
                      setFieldValue('visibility', FeedbackVisibility.General);
                      document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
                    }}>
                    <p className="items-center">{t(TO_GENERAL)}</p>
                  </button>
                  <button
                    disabled={isSubmitting || !values.content}
                    className="btn items-center justify-center"
                    onClick={() => {
                      setFieldValue('visibility', FeedbackVisibility.Administration);
                      document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
                    }}>
                    <p>{t(TO_ADMINISTRATION)}</p>
                  </button>
                  <button
                    disabled={isSubmitting || !values.content || !isAvailabeToCeo}
                    className="btn items-center justify-center text-red-500"
                    onClick={() => {
                      setFieldValue('visibility', FeedbackVisibility.CEO);
                      document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
                    }}>
                    <p>{t(TO_CEO)}</p>
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
