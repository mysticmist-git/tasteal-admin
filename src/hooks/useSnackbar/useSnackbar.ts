import {
  UseSnackbarOpenAction,
  UseSnackbarProps,
} from '@/hooks/useSnackbar/types';
import { AlertColor } from '@mui/material';
import { useCallback, useState } from 'react';

export const useSnackbar = (): [
  UseSnackbarProps,
  string,
  AlertColor,
  UseSnackbarOpenAction,
] => {
  const [open, setOpen] = useState(false);
  const [autoHideDuration, setAutoHideDuration] = useState(6000);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenSnackbar = useCallback(
    (
      message: string,
      severity: AlertColor = 'success',
      duration: number = 6000
    ) => {
      setOpen(true);
      setAutoHideDuration(duration);
      setMessage(message);
      setSeverity(severity);
    },
    []
  );

  return [
    {
      open,
      autoHideDuration,
      onClose: handleClose,
    },
    message,
    severity,
    handleOpenSnackbar,
  ];
};
