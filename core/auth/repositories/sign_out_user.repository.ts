import supabase from '@root/src/supabase_client';

export async function signOut(): Promise<string | null> {
  const { error } = await supabase.auth.signOut();
  return error?.message;
}
