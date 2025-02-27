import { NotificationBellIcon } from '@root/src/assets/icons';
import { useUsersStore } from '@root/src/lib/core/auth/auth.store';
import { useGetNotifications } from '@root/src/lib/core/notifications/queries/useGetNotifications';
import { useUpdateNotification } from '@root/src/lib/core/notifications/queries/useUpdateNotification';
import { notificationMapping } from '@root/src/lib/utils/notification_map';
import { useTranslation } from 'react-i18next';
import queryClient from '@root/src/lib/core/react-query/queryClient';
import { NEW_NOTIFICATIONS_QUERY_KEY, NOTIFICATIONS_QUERY_KEY } from '@root/src/lib/core/notifications/queries/consts';
import { LOAD_MORE } from '../dashboard/const';
import { useGetNewNotifications } from '@root/src/lib/core/notifications/queries/useGetNewNotifications';
import { Popover } from '@mui/material';
import { useState } from 'react';

const Notifications = () => {
  const { t } = useTranslation();
  const { id: currentUserId } = useUsersStore(s => s.user.user);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const {
    data: notifications,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNotifications({ currentUserId });
  // const [updateNotificationMutation, isUpdatingNotification, isErrorNotificaionUpdate] = useUpdateNotification();
  const [updateNotificationMutation] = useUpdateNotification();

  const { data: newNotificationsCount } = useGetNewNotifications({ currentUserId });

  const invalidateNotifications = async () => {
    await queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
    await queryClient.invalidateQueries({ queryKey: [NEW_NOTIFICATIONS_QUERY_KEY] });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBellClick = event => {
    setAnchorEl(event.currentTarget);
    const newNotificationIds = notifications?.pages.map(
      (page: any) => page?.data?.filter(notification => notification.is_new).map(notification => notification.id),
    );

    if (newNotificationIds && newNotificationIds.length > 0) {
      updateNotificationMutation.mutate(
        {
          notificationsIds: newNotificationIds,
        },
        {
          onSettled: () => invalidateNotifications(),
        },
      );
    }
  };

  const renderNotifications = () => {
    if (notifications?.pages.length === 0) {
      return (
        <div className="p-10 items-center self-center justify-center flex">
          <p>{t('empty')}</p>
        </div>
      );
    }
    return notifications?.pages.map(
      (page: any) =>
        page?.data.map(notification => {
          const currentNotificationMap = notificationMapping[notification.status];

          return (
            <div
              className={`flex flex-col p-2 border-b-[2px] border-gray-300 ${
                notification.is_new && 'bg-neutral-300 animate-pulse ease-out '
              }`}
              key={notification.id}>
              <p className="whitespace-normal break-words">{t(currentNotificationMap.title)}</p>
              {currentNotificationMap.content(notification.metadata)}
            </div>
          );
        }),
    );
  };

  const showSpinner = () => {
    return (
      <div className="self-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  };

  const renderNotificationsCount = () =>
    newNotificationsCount > 0 && (
      <span className="absolute top-4 right-4 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center ">
        {newNotificationsCount}
      </span>
    );

  const loadMoreButton = () => (
    <p
      className="btn m-4 max-w-[200px] self-center"
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        fetchNextPage();
      }}>
      {t(LOAD_MORE)}
    </p>
  );

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1 relative" onClick={e => handleBellClick(e)}>
        <NotificationBellIcon />
        {renderNotificationsCount()}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <div className="flex flex-col gap-2 min-w-[250px] max-w-[500px] max-h-[30vh] overflow-y-auto">
          {isLoading || (isFetchingNextPage && showSpinner())}
          {renderNotifications()}
          {hasNextPage && !isFetchingNextPage && loadMoreButton()}
        </div>
      </Popover>
    </div>
  );
};

export default Notifications;
