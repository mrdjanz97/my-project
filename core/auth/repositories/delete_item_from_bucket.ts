import supabase from '@root/src/supabase_client';
import { DEV_BUCKET } from '@root/src/database/table.names';

export const deleteItemFromBucketRepository = async path => {
  const { data, error } = await supabase.storage.from(DEV_BUCKET).remove([path]);

  if (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }

  return { data, error };
};
