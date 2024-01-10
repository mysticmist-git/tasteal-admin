import { SnackbarService } from '@/provider/SnackbarProvider';
import { useContext } from 'react';

const useSnackbarService = () => useContext(SnackbarService);

export { useSnackbarService };
