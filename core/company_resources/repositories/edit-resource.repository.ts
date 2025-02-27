import supabase from '@root/src/supabase_client';
import { COMPANY_RESOURCES } from '@root/src/database/table.names';

export const editResourceRepository = async ({ id, title, link, type }) => {
  const { data, error } = await supabase.from(COMPANY_RESOURCES).update({ title, link, type }).eq('id', id); // Specify the resource ID to be updated
  if (error) {
    console.error('Error updating company resource:', error.message);
    throw error;
  }
  return { data, error };
};
