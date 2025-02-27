import { Alert, Snackbar } from '@mui/material';
import { useToastStore } from '@root/src/lib/core/toast/toast.store';
type SnackbarCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown';
export const Toast = () => {
  const { isToastVisible, text, severity, closeToast } = useToastStore();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeToast();
  };
  return (
    <Snackbar open={isToastVisible} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
};
