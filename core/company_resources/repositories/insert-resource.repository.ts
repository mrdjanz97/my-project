import supabase from '@root/src/supabase_client';
import { COMPANY_RESOURCES } from '@root/src/database/table.names';

export const insertResourceRepository = async ({ title, link, type }) => {
  const { data, error } = await supabase.from(COMPANY_RESOURCES).insert([{ title, link, type }]);

  if (error) {
    console.error('Error inserting into company_resources:', error.message);
    throw error;
  }

  return { data, error };
};
