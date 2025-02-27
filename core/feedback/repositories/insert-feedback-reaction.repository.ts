import supabase from '@root/src/supabase_client';
import { FEEDBACK_REACTIONS_TABLE } from '@root/src/database/table.names';

export async function insertFeedbackReactionRepository({ feedbackId, reaction, userId }) {
  const { data, error } = await supabase.from(FEEDBACK_REACTIONS_TABLE).insert({
    feedback_id: feedbackId,
    reaction,
    user_id: userId,
  });
  return { data, error };
}
