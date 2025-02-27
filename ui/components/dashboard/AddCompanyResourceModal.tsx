import React, { useState } from 'react';
import {
  ADD_NEW_RESOURCE,
  FILE,
  LINK,
  RESOURCE_NAME_PLACEHOLDER,
  RESOURCE_URL_PLACEHOLDER,
  SELECT_FILE,
  ADD_COMPANY_RESOURCE_MODAL_ID,
  RESOURCE_ERROR_ADD,
  RESOURCE_SUCCESS_ADD,
} from './const';
import { Form, Formik } from 'formik';
import { addResourceValidationSchema } from './validation/resource';
import { useTranslation } from 'react-i18next';
import { useInsertResource } from '@root/src/lib/core/company_resources/queries/useInsertResource';
import queryClient from '@root/src/lib/core/react-query/queryClient';
import { RESOURCES_QUERY_KEY } from '@root/src/lib/core/company_resources/queries/const/consts';
import { useUploadResource } from '@root/src/lib/core/company_resources/queries/useUploadResource';
import { CLOSE, SUBMIT, UPLOADING } from '../common/const/consts';
import { useInsertNotification } from '@root/src/lib/core/notifications/queries/useInsertNotification';
import { NOTIFICATION_STATUS, NOTIFICATION_TYPE } from '@root/src/lib/core/notifications/notification';
import { useUsersStore } from '@root/src/lib/core/auth/auth.store';
import { useToastStore } from '@root/src/lib/core/toast/toast.store';
import { ToastSeverity } from '@root/src/lib/core/toast/toast';

const AddCompanyResourceModal = () => {
  const { t } = useTranslation();
  const { openToast } = useToastStore();
  const { id: currentUserId } = useUsersStore(s => s.user.user);

  const [fileName, setFileName] = useState('');

  const [uploadResource, isUploadingResource] = useUploadResource();
  // const [uploadResource, isUploadingResource, isErrorUploadingResource] = useUploadResource();
  const [insertResource, isInsertingResource] = useInsertResource();
  const [insertNotification] = useInsertNotification();

  const initialValues = {
    resourceName: '',
    resourceLink: '',
    file: null as File | null,
  };

  const closeResourceModal = () => {
    if (document) {
      const modalElement = document.getElementById(ADD_COMPANY_RESOURCE_MODAL_ID) as HTMLFormElement;
      modalElement.close();
    }
  };

  const resetFileStorage = () => {
    setFileName('');
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
      fileInput.name = '';
    }
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, resetForm: () => any) => {
    e.preventDefault();
    resetFileStorage();
    resetForm();
    closeResourceModal();
  };

  const invalidateResources = () => {
    queryClient.invalidateQueries({ queryKey: [RESOURCES_QUERY_KEY] });
    resetFileStorage();
    closeResourceModal();
  };

  const uploadResourceHandler = (values, resetForm) => {
    uploadResource.mutateAsync(
      { file: values.file },
      {
        onSuccess: async data => {
          insertResource.mutateAsync(
            {
              title: values.resourceName,
              link: data,
              type: FILE,
            },
            {
              onSuccess: async () => {
                await insertNotification.mutateAsync({
                  status: NOTIFICATION_STATUS.RESOURCE_CREATED,
                  fromUserId: currentUserId,
                  forUserId: currentUserId,
                  type: NOTIFICATION_TYPE.GLOBAL,
                  metadata: {
                    resource_name: values.resourceName,
                  },
                });
                openToast(t(RESOURCE_SUCCESS_ADD), ToastSeverity.SUCCESS);
                resetForm();
                invalidateResources();
              },
              onError: () => {
                openToast(t(RESOURCE_ERROR_ADD), ToastSeverity.ERROR);
              },
            },
          );
        },
      },
    );
  };

  const insertResoureLinkHandler = (values, resetForm) => {
    insertResource.mutateAsync(
      {
        title: values.resourceName,
        link: values.resourceLink,
        type: LINK,
      },
      {
        onSuccess: async () => {
          await insertNotification.mutateAsync({
            status: NOTIFICATION_STATUS.RESOURCE_CREATED,
            fromUserId: currentUserId,
            toUserId: currentUserId,
            type: NOTIFICATION_TYPE.GLOBAL,
            metadata: {
              resource_name: values.resourceName,
            },
          });
          openToast(t(RESOURCE_SUCCESS_ADD), ToastSeverity.SUCCESS);
          resetForm();
          invalidateResources();
        },
        onError: () => {
          openToast(t(RESOURCE_ERROR_ADD), ToastSeverity.ERROR);
        },
      },
    );
  };

  return (
    <dialog id={ADD_COMPANY_RESOURCE_MODAL_ID} className="modal open">
      <div className="modal-box gap-6 flex flex-col">
        <h2 className="self-center text-lg">{t(ADD_NEW_RESOURCE)}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={addResourceValidationSchema}
          onSubmit={async (values, { resetForm }) => {
            if (values.file) {
              uploadResourceHandler(values, resetForm);
              return;
            }
            insertResoureLinkHandler(values, resetForm);
          }}>
          {({ isSubmitting, handleChange, setFieldValue, values, errors, resetForm }) => (
            <Form className="flex flex-col gap-4">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  name="resourceName"
                  placeholder={t(RESOURCE_NAME_PLACEHOLDER)}
                  onChange={handleChange}
                  value={values.resourceName}
                  className="grow"
                />
                {errors.resourceName && <div className="text-red-500">{t(errors.resourceName)}</div>}
              </label>

              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  name="resourceLink"
                  placeholder={t(RESOURCE_URL_PLACEHOLDER)}
                  onChange={handleChange}
                  value={values.resourceLink}
                  className="grow"
                  disabled={!!values.file}
                />
                {errors.resourceLink && !fileName && <div className="text-red-500">{t(errors.resourceLink)}</div>}
              </label>

              <div className="flex items-center gap-2">
                <label htmlFor="file" className="btn">
                  {t(SELECT_FILE)}
                </label>
                <input
                  id="file"
                  accept=".doc,.docx,.xls,.xlsx,.txt,.pdf"
                  className="hidden"
                  type="file"
                  name="file"
                  onChange={event => {
                    const file = event.currentTarget.files?.[0] || null;
                    setFieldValue('file', file);
                    setFileName(file?.name || '');
                    if (file) setFieldValue('resourceLink', '');
                  }}
                  disabled={!!values.resourceLink}
                />
                {fileName && <div className="text-gray-700">{fileName}</div>}
                {errors.file && <div className="text-red-500">{t(errors?.file.toString())}</div>}
              </div>

              <div className="flex gap-4 w-full justify-center">
                <button
                  type="submit"
                  className="btn btn-primary w-[40%]"
                  disabled={isSubmitting || isUploadingResource || isInsertingResource}>
                  {isSubmitting || isUploadingResource || isInsertingResource ? t(UPLOADING) : t(SUBMIT)}
                </button>
                <button onClick={e => handleCloseModal(e, resetForm)} className="btn w-[40%]">
                  {t(CLOSE)}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </dialog>
  );
};

export default AddCompanyResourceModal;
