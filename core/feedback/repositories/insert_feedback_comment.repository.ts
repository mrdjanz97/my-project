import supabase from '@root/src/supabase_client';
import { FEEDBACK_COMMENTS_TABLE } from '@root/src/database/table.names';

export async function insertFeedbackCommentRepository({ feedbackId, comment }) {
  const { data, error } = await supabase.from(FEEDBACK_COMMENTS_TABLE).insert({
    feedback_id: feedbackId,
    comment,
  });
  return { data, error };
}
