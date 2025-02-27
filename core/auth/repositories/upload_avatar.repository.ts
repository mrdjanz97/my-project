import supabase from '@root/src/supabase_client';
import { AVATARS_BUCKET_FOLDER, DEV_BUCKET } from '@root/src/database/table.names';

export const uploadAvatarRepository = async (file: File) => {
  const timestamp = Date.now();

  const uniqueFileName = `${timestamp}-${file.name}`;

  const { data, error } = await supabase.storage
    .from(DEV_BUCKET)
    .upload(`${AVATARS_BUCKET_FOLDER}/${uniqueFileName}`, file);

  if (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }

  const filePath = `${AVATARS_BUCKET_FOLDER}/${uniqueFileName}`;
  return { filePath, error };
};
