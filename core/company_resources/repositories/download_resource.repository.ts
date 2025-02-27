import supabase from '@root/src/supabase_client';
import { DEV_BUCKET } from '@root/src/database/table.names';

export const downloadResourceRepository = async ({ fileName }) => {
  const { data, error } = await supabase.storage.from(DEV_BUCKET).download(fileName);

  if (error) {
    console.error('Error downloading resource:', error.message);
    throw error;
  }

  return { data, error };
};
