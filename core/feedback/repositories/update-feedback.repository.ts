import supabase from '@root/src/supabase_client';
import { FEEDBACKS_TABLE } from '@root/src/database/table.names';

export async function updateFeedbackRepository({ status, feedbackId }) {
  const { data, error } = await supabase
    .from(FEEDBACKS_TABLE)
    .update({
      status,
    })
    .eq('id', feedbackId)
    .select('*');
  return { data, error };
}
