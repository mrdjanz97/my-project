import supabase from '@root/src/supabase_client';
import { FEEDBACKS_TABLE } from '@root/src/database/table.names';

export const getLatestSingleFeedbackRepository = async ({ currentUserId }) => {
  const { data, error } = await supabase
    .from(FEEDBACKS_TABLE)
    .select('*')
    .eq('owner_id', currentUserId)
    .eq('visibility', 'ceo')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching feedbacks:', error.message);
    throw error;
  }

  return { data: data ? data[0] : null, error };
};
