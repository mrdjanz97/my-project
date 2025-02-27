import supabase from '@root/src/supabase_client';
import { LoginCredentials } from '@root/src/lib/background/models/login-credentials.interface';

export async function signIn(values: LoginCredentials): Promise<{ data: any; error: string }> {
  const { data, error } = await supabase.auth.signInWithPassword(values);
  return { data: data?.session, error: error?.message };
}
