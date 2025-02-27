import supabase from '@root/src/supabase_client';
import { NOTIFICATIONS_TABLE } from '@root/src/database/table.names';
import { PAGE_COUNT } from '../../feedback/queries/const/consts';

export const getNotificationsRepository = async ({ currentUserId, pageParam }) => {
  const offset = (pageParam - 1) * PAGE_COUNT;

  const { data, error, count } = await supabase
    .from(NOTIFICATIONS_TABLE)
    .select('*', { count: 'exact' })
    .or(`for_user_id.eq.${currentUserId},from_user_id.neq.${currentUserId}`)
    .order('created_at', { ascending: false })
    .range(offset, offset + PAGE_COUNT - 1);

  if (error) {
    console.error('Error fetching resources from company_resources:', error.message);
    throw error;
  }

  return { data, count, error };
};
