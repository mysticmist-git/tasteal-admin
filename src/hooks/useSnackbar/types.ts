import { AlertColor } from '@mui/material';

export type UseSnackbarProps = {
  open: boolean;
  autoHideDuration: number;
  onClose: () => void;
};

export type UseSnackbarOpenAction = (
  message: string,
  severity?: AlertColor,
  duration?: number
) => void;
