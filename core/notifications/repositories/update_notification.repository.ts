import supabase from '@root/src/supabase_client';
import { NOTIFICATIONS_TABLE } from '@root/src/database/table.names';

export const updateNotificationRepository = async ({ notificationsIds }) => {
  const { data, error } = await supabase
    .from(NOTIFICATIONS_TABLE)
    .update([{ is_new: false }])
    .in('id', notificationsIds);

  if (error) {
    console.error('Error updating into notifications:', error.message);
    throw error;
  }

  return { data, error };
};
