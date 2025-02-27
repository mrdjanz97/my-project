import { useState } from 'react';
import {
  FILE,
  LINK,
  RESOURCE_NAME_PLACEHOLDER,
  RESOURCE_URL_PLACEHOLDER,
  SELECT_FILE,
  ADD_COMPANY_RESOURCE_MODAL_ID,
  EDIT_RESOURCE,
  DOWNLOAD_PREVIOUS_RESOURCE,
  RESOURCE_SUCCESS_EDIT,
  RESOURCE_ERROR_EDIT,
} from './const';
import { Form, Formik } from 'formik';
import { addResourceValidationSchema } from './validation/resource';
import { useTranslation } from 'react-i18next';
import queryClient from '@root/src/lib/core/react-query/queryClient';
import { RESOURCES_QUERY_KEY } from '@root/src/lib/core/company_resources/queries/const/consts';
import { useUploadResource } from '@root/src/lib/core/company_resources/queries/useUploadResource';
import { CLOSE, SUBMIT, UPLOADING } from '../common/const/consts';
import { useInsertNotification } from '@root/src/lib/core/notifications/queries/useInsertNotification';
import { NOTIFICATION_STATUS, NOTIFICATION_TYPE } from '@root/src/lib/core/notifications/notification';
import { useUsersStore } from '@root/src/lib/core/auth/auth.store';
import { useToastStore } from '@root/src/lib/core/toast/toast.store';
import { ToastSeverity } from '@root/src/lib/core/toast/toast';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useEditResource } from '@root/src/lib/core/company_resources/queries/useEditResource';

const EditCompanyResourceModal = ({ resource, openEdit, closeEdit, closePopover }: any) => {
  const { t } = useTranslation();
  const { openToast } = useToastStore();
  const { id: currentUserId } = useUsersStore(s => s.user.user);

  const [fileName, setFileName] = useState('');

  const [uploadResource, isUploadingResource] = useUploadResource();
  const [editResourceMutation, isEditingResource] = useEditResource();
  const [insertNotification] = useInsertNotification();

  const initialValues = {
    resourceName: resource.title,
    resourceLink: resource.type == 'file' ? '' : resource.link,
    file: resource.file as File | null,
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
          editResourceMutation.mutateAsync(
            {
              id: resource.id,
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
                openToast(t(RESOURCE_SUCCESS_EDIT), ToastSeverity.SUCCESS);
                resetForm();
                invalidateResources();
                resetFileStorage();
                closePopover();
                closeEdit();
              },
              onError: () => {
                openToast(t(RESOURCE_ERROR_EDIT), ToastSeverity.ERROR);
              },
            },
          );
        },
      },
    );
  };

  const insertResoureLinkHandler = (values, resetForm) => {
    editResourceMutation.mutateAsync(
      {
        id: resource.id,
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
          openToast(t(RESOURCE_SUCCESS_EDIT), ToastSeverity.SUCCESS);
          resetForm();
          invalidateResources();
          resetFileStorage();
          closePopover();
          closeEdit();
        },
        onError: () => {
          openToast(t(RESOURCE_ERROR_EDIT), ToastSeverity.ERROR);
        },
      },
    );
  };

  return (
    <>
      <Dialog
        open={openEdit}
        onClose={() => closeEdit()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '450px',
            padding: '20px',
          },
        }}>
        <DialogTitle sx={{ textAlign: 'center' }}>{t(EDIT_RESOURCE)}</DialogTitle>
        <DialogContent>
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
            {({ isSubmitting, handleChange, setFieldValue, values, errors }) => (
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
                </label>

                <div className="flex items-center justify-between gap-2">
                  <div>
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
                  <button className="btn w-auto">
                    {resource.type == 'file' ? <a href={resource.link}>{t(DOWNLOAD_PREVIOUS_RESOURCE)}</a> : ''}
                  </button>
                </div>

                <div className="flex gap-4 w-full justify-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-[40%]"
                    disabled={isSubmitting || isUploadingResource || isEditingResource}>
                    {isSubmitting || isUploadingResource || isEditingResource ? t(UPLOADING) : t(SUBMIT)}
                  </button>
                  <button type="button" onClick={() => closeEdit()} className="btn w-[40%]">
                    {t(CLOSE)}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCompanyResourceModal;
