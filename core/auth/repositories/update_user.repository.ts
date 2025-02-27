import supabase from '@root/src/supabase_client';
import { PROFILES_TABLE } from '@root/src/database/table.names';

export async function updateUserRepository({ avatar, userId }) {
  const { data, error } = await supabase
    .from(PROFILES_TABLE)
    .update({
      avatar,
    })
    .eq('id', userId)
    .select('*');
  return { data, error };
}
