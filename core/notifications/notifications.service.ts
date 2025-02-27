import { insertNotificationRepository } from './repositories';
import { getNewNotificationsCountRepository } from './repositories/get_new_notifications_count.repository';
import { getNotificationsRepository } from './repositories/get_notifications.repository';
import { updateNotificationRepository } from './repositories/update_notification.repository';

export const insertNotification = async payload => {
  try {
    const { data, error } = await insertNotificationRepository(payload);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNotifications = async payload => {
  try {
    const { data, error, count } = await getNotificationsRepository(payload);
    if (error) {
      throw error;
    }
    console.log(data, 'DADADA');
    return { data, count };
  } catch (error) {
    console.log(error);
  }
};

export const updateNotification = async payload => {
  try {
    const { data, error } = await updateNotificationRepository(payload);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNewNotificationsCount = async payload => {
  try {
    const { data, error } = await getNewNotificationsCountRepository(payload);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
