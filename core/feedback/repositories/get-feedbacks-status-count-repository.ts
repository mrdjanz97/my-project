import supabase from '@src/supabase_client';

export const getFeedbackCountsByStatusRepository = async () => {
  const { data, error } = await supabase.rpc('get_feedback_counts_by_status');

  return { data, error };
};
