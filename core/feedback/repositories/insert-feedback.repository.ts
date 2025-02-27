import supabase from '@root/src/supabase_client';
import { FEEDBACKS_TABLE } from '@root/src/database/table.names';

export async function insertFeedbackRepository({ ownerId, content, isAnonymous, visibility }) {
  const { data, error } = await supabase.from(FEEDBACKS_TABLE).insert({
    owner_id: ownerId,
    content,
    is_anonymous: isAnonymous,
    visibility,
  });
  return { data, error };
}
