import supabase from '@root/src/supabase_client';
import { COMPANY_RESOURCES } from '@root/src/database/table.names';

export const removeResourceRepository = async ({ id }) => {
  const { data, error } = await supabase.from(COMPANY_RESOURCES).delete().eq('id', id); // Use 'id' as the identifier for deletion
  if (error) {
    console.error('Error deleting from company_resources:', error.message);
    throw error;
  }

  return { data, error };
};
