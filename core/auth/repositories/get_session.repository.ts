import supabase from '@root/src/supabase_client';

export async function getUserSession(): Promise<{ data: any; error: string }> {
  const session = await supabase.auth.getSession();
  return { data: session?.data?.session, error: null };
}
