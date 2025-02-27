import { RESOURCE_SUCCESS_REMOVE, RESOURCE_ERROR_REMOVE, ARE_SURE, REMOVE_RESOURCE, CLOSE_RESOURCE } from './const';
import { useTranslation } from 'react-i18next';
import queryClient from '@root/src/lib/core/react-query/queryClient';
import { RESOURCES_QUERY_KEY } from '@root/src/lib/core/company_resources/queries/const/consts';
import { useToastStore } from '@root/src/lib/core/toast/toast.store';
import { ToastSeverity } from '@root/src/lib/core/toast/toast';
import { useRemoveResource } from '@root/src/lib/core/company_resources/queries/useRemoveResource';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';

const RemoveCompanyResourceModal = ({ resource, dialogOpen, dialogClose, closePopover }: any) => {
  const { t } = useTranslation();
  const { openToast } = useToastStore();
  const [removeResourceMutation] = useRemoveResource();

  const invalidateResources = () => {
    queryClient.invalidateQueries({ queryKey: [RESOURCES_QUERY_KEY] });
  };

  const removeResourceHandler = () => {
    removeResourceMutation.mutateAsync(
      {
        id: resource.id,
      },
      {
        onSuccess: async () => {
          openToast(t(RESOURCE_SUCCESS_REMOVE), ToastSeverity.SUCCESS);
          invalidateResources();
          closePopover();
          dialogClose();
        },
        onError: () => {
          openToast(t(RESOURCE_ERROR_REMOVE), ToastSeverity.ERROR);
        },
      },
    );
  };

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {t(ARE_SURE)} {resource.title}?
        </DialogTitle>
        <DialogActions sx={{ justifyContent: 'center', marginBottom: '10px' }}>
          <button type="submit" className="btn btn-primary w-[40%]" onClick={() => removeResourceHandler()}>
            {t(REMOVE_RESOURCE)}
          </button>
          <button onClick={() => dialogClose()} className="btn w-[40%]">
            {t(CLOSE_RESOURCE)}
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RemoveCompanyResourceModal;
