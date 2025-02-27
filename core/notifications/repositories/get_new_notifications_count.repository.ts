import supabase from '@src/supabase_client';
import { NEW_NOTIFICATIONS_COUNT_RPC } from '@root/src/database/table.names';

export const getNewNotificationsCountRepository = async ({ currentUserId }) => {
  const { data, error } = await supabase.rpc(NEW_NOTIFICATIONS_COUNT_RPC, { user_id: currentUserId });

  return { data, error };
};
