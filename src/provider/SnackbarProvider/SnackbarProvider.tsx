import { useSnackbar } from '@/hooks/useSnackbar';
import { SnackbarServiceState } from '@/provider/SnackbarProvider/types';
import { Alert, Snackbar } from '@mui/material';
import { FC, PropsWithChildren, createContext } from 'react';

const SnackbarService = createContext<SnackbarServiceState>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_message: string) => {},
);

const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [snackbarProps, message, severity, handleOpenSnackbar] = useSnackbar();

  return (
    <SnackbarService.Provider value={handleOpenSnackbar}>
      {children}
      <Snackbar {...snackbarProps}>
        <Alert
          onClose={snackbarProps.onClose}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarService.Provider>
  );
};

export default SnackbarProvider;
export { SnackbarService };

