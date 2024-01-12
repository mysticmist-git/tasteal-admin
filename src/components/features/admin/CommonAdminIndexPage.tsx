import { FormTitle } from '@/components/shared/ui/labels';
import {
  Add,
  Close,
  Delete,
  EditRounded,
  RemoveRedEye,
  VpnKeyRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';

export type CommonIndexPageProps<RowType> = {
  title: string;
  rows: RowType[];
  columns: GridColDef[];
  loading: boolean;
  dialogProps: {
    title: string;
    content: string;
  };
  onCreateClick?: () => void;
  onViewClick?: (id: any) => void;
  onDeleteClick?: (id: any) => Promise<void>;
  onSoftDeleteClick?: (id: any) => Promise<void>;
  canDelete?: boolean;
  softDialogProps?: {
    title: string;
    content: string;
  };
  hideAddButton?: boolean;
  isDeleted?: boolean;
};

export function CommonIndexPage<RowType>({
  title,
  rows,
  loading,
  columns: paramColumn,
  dialogProps,
  softDialogProps,
  onCreateClick,
  onViewClick,
  onDeleteClick,
  canDelete = true,
  onSoftDeleteClick,
  hideAddButton,
  isDeleted,
}: CommonIndexPageProps<RowType>) {
  //#region Hooks

  // const [snackbarAlert] = useSnackbarService();

  //#endregion
  //#region Delete Operation

  // Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteClose = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  // Soft Delete
  const [softDeleteDialogOpen, setSoftDeleteDialogOpen] = useState(false);
  const handleSoftDeleteClose = useCallback(() => {
    setSoftDeleteDialogOpen(false);
  }, []);

  // Delete states and functions
  const [toDeleteRowId, setToDeleteRowId] = useState<number | null>(null);
  const handleDeleteRow = useCallback(async () => {
    if (!onDeleteClick) return;

    if (toDeleteRowId === null) {
      return;
    }
    await onDeleteClick(toDeleteRowId);
    setDeleteDialogOpen(false);
  }, [onDeleteClick, toDeleteRowId]);

  const handleSoftDeleteRow = useCallback(async () => {
    if (!onSoftDeleteClick) return;

    if (toDeleteRowId === null) {
      return;
    }
    await onSoftDeleteClick(toDeleteRowId);
    setSoftDeleteDialogOpen(false);
  }, [onSoftDeleteClick, toDeleteRowId]);

  //#endregion
  //#region Datagrid Columns

  const handleCreate = useCallback(() => {
    onCreateClick && onCreateClick();
  }, [onCreateClick]);
  const handleView = useCallback(
    (id: any) => {
      onViewClick && onViewClick(id);
    },
    [onViewClick]
  );
  const columns: GridColDef[] = useMemo(
    () => [
      ...paramColumn,
      {
        field: 'action',
        type: 'actions',
        headerName: 'Hành động',
        flex: 1,
        getActions: (params) => [
          <GridActionsCellItem
            sx={{
              display: onViewClick ? '' : 'none',
            }}
            icon={<RemoveRedEye />}
            label="Mở"
            onClick={() => {
              handleView(params.row.id);
            }}
          />,
          <GridActionsCellItem
            sx={{
              display: onSoftDeleteClick ? '' : 'none',
            }}
            icon={<EditRounded />}
            label="Chỉnh sửa"
            onClick={() => {
              setToDeleteRowId(params.row.id);
              setSoftDeleteDialogOpen(true);
            }}
          />,
          <GridActionsCellItem
            icon={isDeleted ? <VpnKeyRounded /> : <Delete />}
            label={isDeleted ? 'Mở' : 'Xóa'}
            onClick={() => {
              setToDeleteRowId(params.row.id);
              setDeleteDialogOpen(true);
            }}
            sx={{ display: canDelete ? 'block' : 'none' }}
          />,
        ],
      },
    ],
    [
      canDelete,
      handleView,
      isDeleted,
      onSoftDeleteClick,
      onViewClick,
      paramColumn,
    ]
  );

  //#endregion

  return (
    <Box p={4} display="flex" flexDirection={'column'} gap={1}>
      <Stack direction="row" justifyContent={'space-between'}>
        <FormTitle>{title}</FormTitle>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={handleCreate}
          sx={{
            width: 100,
            borderRadius: 4,
            display: hideAddButton ? 'none' : '',
          }}
        >
          Thêm
        </Button>
      </Stack>

      <Divider />

      <Box height={720}>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{ minHeight: '100%' }}
        />
      </Box>
      {/* Delete */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
        TransitionComponent={Slide}
        PaperProps={{
          sx: {
            borderRadius: 4,
            width: '50%',
          },
        }}
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography typography={'h6'}>{dialogProps.title}</Typography>
            <IconButton onClick={handleDeleteClose} disabled={loading}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider
          sx={{
            opacity: 0.5,
          }}
        />
        <DialogContent>
          <DialogContentText>{dialogProps.content}</DialogContentText>
        </DialogContent>
        <Divider
          sx={{
            opacity: 0.5,
          }}
        />
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteRow}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Xóa'
            )}
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteClose}
            disabled={loading}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>

      {/* Soft Delete */}
      <Dialog
        open={softDeleteDialogOpen}
        onClose={handleSoftDeleteClose}
        TransitionComponent={Slide}
        PaperProps={{
          sx: {
            borderRadius: 4,
            width: '50%',
          },
        }}
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography typography={'h6'}>{softDialogProps?.title}</Typography>
            <IconButton onClick={handleSoftDeleteClose} disabled={loading}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider
          sx={{
            opacity: 0.5,
          }}
        />
        <DialogContent>
          <DialogContentText>{softDialogProps?.content}</DialogContentText>
        </DialogContent>
        <Divider
          sx={{
            opacity: 0.5,
          }}
        />
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleSoftDeleteRow}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Ẩn'
            )}
          </Button>
          <Button
            variant="contained"
            onClick={handleSoftDeleteClose}
            disabled={loading}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
