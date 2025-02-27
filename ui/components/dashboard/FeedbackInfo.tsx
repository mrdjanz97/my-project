import {
  GmailIcon,
  GoogleCalendarIcon,
  GoogleDriveIcon,
  GoogleMapIcon,
  GooglePhotosIcon,
} from '@root/src/assets/icons';
import {
  GMAIL_LINK,
  GOOGLE_CALENDAR_LINK,
  GOOGLE_DRIVE_LINK,
  GOOGLE_MAPS_LINK,
  GOOGLE_PHOTOS_LINK,
  UserRoles,
} from '../common/const/consts';
import { useTranslation } from 'react-i18next';
import { PROVIDE_FEEDBACK, RESOLVED_FEEDBACKS, TOTAL_FEEDBACKS, UNRESOLVED_FEEDBACKS } from './const';
import { useGetFeedbacksStatusCount } from '@root/src/lib/core/feedback/queries/useGetFeedbacksStatusCount';
// import RejectFeedbackModal from './RejectFeedbackModal';

export const FeedbackInfo = ({ isAddFeedbackOpen, openFeedback, role }: any) => {
  const { t } = useTranslation();

  const { data: statusData, isLoading: isStatusFetching } = useGetFeedbacksStatusCount();
  const resolvedCount = statusData && statusData.length > 0 ? statusData[0].resolved_count : 0;
  const unresolvedCount = statusData && statusData.length > 0 ? statusData[0].unresolved_count : 0;
  const pendingCount = statusData && statusData.length > 0 ? statusData[0].pending_count : 0;

  const feedbackInfoCards = [
    {
      label: TOTAL_FEEDBACKS,
      count: pendingCount + unresolvedCount + resolvedCount,
      color: 'black-500',
    },
    {
      label: RESOLVED_FEEDBACKS,
      count: resolvedCount,
      color: '#6CCB85',
    },
    {
      label: UNRESOLVED_FEEDBACKS,
      count: unresolvedCount,
      color: 'red-500',
    },
  ];

  // TODO find appropriate place for these googleIcons
  const googleIcons = [
    {
      label: 'Google maps',
      renderIcon: () => <GoogleMapIcon />,
      navigate: () => (window.location.href = GOOGLE_MAPS_LINK),
    },
    {
      label: 'Gmail',
      renderIcon: () => <GmailIcon />,
      navigate: () => (window.location.href = GMAIL_LINK),
    },
    {
      label: 'Google calendar',
      renderIcon: () => <GoogleCalendarIcon />,
      navigate: () => (window.location.href = GOOGLE_CALENDAR_LINK),
    },
    {
      label: 'Google drive',
      renderIcon: () => <GoogleDriveIcon />,
      navigate: () => (window.location.href = GOOGLE_DRIVE_LINK),
    },
    {
      label: 'Google photos',
      renderIcon: () => <GooglePhotosIcon />,
      navigate: () => (window.location.href = GOOGLE_PHOTOS_LINK),
    },
  ];

  const showSpinner = () => {
    return (
      <div className="self-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  };

  return (
    <>
      {' '}
      <div className="flex flex-col w-full gap-6">
        <div className="flex w-full justify-between gap-4">
          {feedbackInfoCards.map((card, index) => (
            <div key={index} className="flex p-8 bg-primary rounded-2xl items-center flex-grow gap-4">
              <p style={{ color: card.color }} className={`text-${card.color} text-3xl font-bold`}>
                {isStatusFetching ? showSpinner() : t(card.count)}
              </p>
              <p className="text-gray-500">{t(card.label)}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            {googleIcons.map((icon, index) => (
              <button
                onClick={() => icon?.navigate()}
                key={index}
                className="btn bg-primary shadow-md rounded-xl w-[50px]">
                {icon.renderIcon()}
              </button>
            ))}
          </div>
          {role === UserRoles.EMPLOYEE && !isAddFeedbackOpen && (
            <button onClick={openFeedback} className="btn btn-accent text-white text-lg font-semibold rounded-xl">
              {t(PROVIDE_FEEDBACK)}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
