import supabase from '@root/src/supabase_client';
import { COMPANY_RESOURCES } from '@root/src/database/table.names';

export const getResourcesRepository = async () => {
  const { data, error } = await supabase.from(COMPANY_RESOURCES).select('*');

  if (error) {
    console.error('Error fetching resources from company_resources:', error.message);
    throw error;
  }

  return { data, error };
};
