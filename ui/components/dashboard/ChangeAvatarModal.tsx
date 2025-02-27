import React, { useState } from 'react';
import { AVATAR_MODAL_TITLE, CHANGE_AVATAR_LABEL, CHANGE_AVATAR_MODAL_ID } from './const/manage_profile_modals';
import { useTranslation } from 'react-i18next';
import { SELECT_IMAGE } from './const';
import { useUploadAvatar } from '@root/src/lib/core/auth/queries/useUploadAvatar';
import { useUpdateUser } from '@root/src/lib/core/auth/queries/useUpdateUser';
import { useUsersStore } from '@root/src/lib/core/auth/auth.store';
import { CLOSE, SUBMIT, UPLOADING } from '../common/const/consts';
import { useDeleteItemFromBucket } from '@root/src/lib/core/auth/queries/useDeleteItemFromBucket';

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ChangeAvatarModal = () => {
  const { t } = useTranslation();
  const { id: currentUserId } = useUsersStore(s => s.user.user);
  const { avatar: currentUserAvatar } = useUsersStore(s => s.profile);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploadAvatarMutation, isUploading, isUploadError] = useUploadAvatar();
  const [updateUserMutation, isUpdating, isUpdateError] = useUpdateUser();
  const [deleteItemFromBucket, isDeletingAvatar] = useDeleteItemFromBucket();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;

    if (file) {
      if (!file.type.startsWith('image/')) {
        setFileError(t('Only image files are allowed'));
        setSelectedFile(null);
        setFileName('');
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFileError(t('File size must be less than 2MB'));
        setSelectedFile(null);
        setFileName('');
        return;
      }

      setFileName(file.name);
      setSelectedFile(file);
      setFileError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(currentUserAvatar, 'AVATAR');

    if (!selectedFile) {
      setFileError(t('Please select an image file to upload.'));
      return;
    }

    if (currentUserAvatar) {
      await deleteItemFromBucket.mutateAsync(currentUserAvatar);
    }

    await uploadAvatarMutation.mutateAsync(
      { file: selectedFile },
      {
        onSuccess: data =>
          updateUserMutation.mutateAsync(
            { avatar: data, userId: currentUserId },
            {
              onSettled: () => {
                setFileName('');
                setSelectedFile(null);
                setFileError('');
              },
            },
          ),
      },
    );
  };

  const closeAvatarModal = e => {
    e.preventDefault();
    if (document) {
      const modalElement = document.getElementById(CHANGE_AVATAR_MODAL_ID) as HTMLFormElement;
      modalElement.close();
    }
  };

  const isLoading = isUploading || isUpdating || isDeletingAvatar;

  return (
    <>
      <dialog id={CHANGE_AVATAR_MODAL_ID} className="modal open">
        <div className="modal-box gap-6 flex flex-col">
          <h3 className="font-bold text-lg">{t(AVATAR_MODAL_TITLE)}</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="image" className="btn">
                {t(SELECT_IMAGE)}
              </label>
              <input
                id="image"
                accept="image/*"
                className="hidden"
                type="file"
                name="file"
                onChange={handleFileChange}
              />
              {fileName && <div className="text-gray-700">{fileName}</div>}
              {fileError && <div className="text-red-500">{fileError}</div>}
            </div>
            <div className="flex gap-4 w-full justify-center">
              <button className="btn btn-primary w-[40%]" type="submit" disabled={!selectedFile || isLoading}>
                {isLoading ? t(UPLOADING) : t(SUBMIT)}{' '}
              </button>
              <button onClick={e => closeAvatarModal(e)} className="btn w-[40%]" type="button">
                {t(CLOSE)}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ChangeAvatarModal;
