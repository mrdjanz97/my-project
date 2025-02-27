import supabase from '@root/src/supabase_client';
import { NOTIFICATIONS_TABLE } from '@root/src/database/table.names';

export const insertNotificationRepository = async ({ status, fromUserId, forUserId, type, metadata = {} }) => {
  const { data, error } = await supabase
    .from(NOTIFICATIONS_TABLE)
    .insert([{ status, from_user_id: fromUserId, for_user_id: forUserId, type, metadata }]);

  if (error) {
    console.error('Error inserting into notifications:', error.message);
    throw error;
  }

  return { data, error };
};
