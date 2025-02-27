import supabase from '@root/src/supabase_client';
import { FEEDBACK_REACTIONS_TABLE } from '@root/src/database/table.names';

export async function deleteFeedbackReactionRepository({ reactionId }) {
  const { data, error } = await supabase.from(FEEDBACK_REACTIONS_TABLE).delete().eq('id', reactionId);
  return { data, error };
}
