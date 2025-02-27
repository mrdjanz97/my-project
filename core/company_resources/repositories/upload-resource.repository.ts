import supabase from '@root/src/supabase_client';
import { DEV_BUCKET, RESOURCES_BUCKET_FOLDER } from '@root/src/database/table.names';

export const uploadResourceRepository = async (file: File) => {
  const timestamp = Date.now();

  const uniqueFileName = `${timestamp}-${file.name}`;

  const { data, error } = await supabase.storage
    .from(DEV_BUCKET)
    .upload(`${RESOURCES_BUCKET_FOLDER}/${uniqueFileName}`, file);

  if (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }

  const filePath = `resources/${uniqueFileName}`;
  return { filePath, error };
};
