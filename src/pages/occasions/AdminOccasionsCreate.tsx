import { OccasionEntity } from '@/api/models/entities/OccasionEntity/OccasionEntity';
import { OccasionService } from '@/api/services/occasionService';
import { AdminOccasionForm, OccasionForm } from '@/components/features/admin';
import { ImagePicker } from '@/components/shared/ui/files';
import { FormLabel, FormTitle } from '@/components/shared/ui/labels';
import { useSnackbarService } from '@/hooks';
import { PageRoute } from '@/lib/constants/common';
import { deleteImage } from '@/lib/firebase';
import { AdminOccasionHelper } from '@/lib/types/admin/occasions/AdminOccasionHelper';
import { FormMode } from '@/lib/types/admin/shared';
import { ArrowBack, Close } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { FC, useEffect, useMemo, useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

const DEFAULT_FORM: OccasionForm = {
  name: '',
  description: '',
  start_at: dayjs(),
  end_at: dayjs().add(7, 'day'),
  is_lunar_date: false,
  image: '',
};

const AdminOccasionsCreate: FC = () => {
  //#region Hooks

  const snackbarAlert = useSnackbarService();
  const { id } = useParams();

  //#endregion
  //#region Mode

  const [mode, setMode] = useState<FormMode>('create');
  const switchModeToEdit = () => {
    if (!form || !('id' in form)) return;

    setMode('edit');
    setOldForm(form);
    let path: string = PageRoute.Occasions.Edit(Number(id));
    path = path.replace(':id', form?.id?.toString() || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };
  const switchModeToView = (id?: string) => {
    if (!id) return;

    setMode('view');
    let path: string = PageRoute.Occasions.View(Number(id));
    path = path.replace(':id', id || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };

  //#endregion
  //#region Navigation

  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigateBack = () => {
    navigate(PageRoute.Occasions.Index);
  };

  //#endregion
  //#region Form

  const [form, setForm] = useState<OccasionForm>(DEFAULT_FORM);

  const [old, setOld] = useState<OccasionEntity>();
  const [oldForm, setOldForm] = useState<OccasionForm>();

  useEffect(() => {
    if (!id) {
      setMode('create');
      form !== DEFAULT_FORM && setForm(DEFAULT_FORM);
      return;
    }

    let active = true;

    setLoading(true);
    (async () => {
      if (location.pathname.includes('edit')) {
        setMode('edit');
      } else {
        setMode('view');
      }
      try {
        console.log('run');
        const occasion = await OccasionService.GetOccasionById(parseInt(id));
        console.log(occasion);
        if (!active) return;

        const gotForm = AdminOccasionHelper.CreateFormObject(occasion);
        setForm(gotForm);
        setOld(occasion);
        setOldForm(gotForm);
      } catch {
        setForm(DEFAULT_FORM);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    if (!form.name) {
      snackbarAlert('Vui lòng nhập tên dịp lễ', 'warning');
      return false;
    }
    if (!form.description) {
      snackbarAlert('Vui lòng nhập miêu tả nhịp lễ', 'warning');
      return false;
    }
    return true;
  };

  const handleCreateSubmit = async () => {
    if (!validate()) return;

    if (!form.image) {
      snackbarAlert('Vui lòng tải ảnh dịp lễ!', 'warning');
      return;
    }

    setDisabled(true);
    setProcessing(true);
    let createdId = '';
    try {
      const reqBody = await AdminOccasionHelper.CreatePostReq(form);
      console.log(reqBody);

      const created = await OccasionService.AddOccasion(reqBody);
      createdId = created.id.toString();
      snackbarAlert('Dịp thêm thành công!', 'success');
    } catch (err) {
      snackbarAlert('Dịp mới đã không được thêm!', 'warning');
      return;
    } finally {
      setDisabled(false);
      setProcessing(false);
      if (!createdId) {
        snackbarAlert('Dịp đã thêm nhưng id rỗng!');
      }
      switchModeToView(createdId);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!old) return;
    if (!validate()) return;
    if (!form.image) {
      snackbarAlert('Vui lòng tải ảnh dịp lễ!', 'warning');
      return;
    }

    setDisabled(true);
    setProcessing(true);
    try {
      const reqBody = await AdminOccasionHelper.CreatePutReq(form, old);
      await OccasionService.UpdateOccasion(reqBody);

      switchModeToView(id);
      snackbarAlert('Dịp cập nhật thành công!', 'success');
    } catch (err) {
      console.log(err);
      snackbarAlert('Dịp đã không được cập nhật', 'warning');
    } finally {
      setDisabled(false);
      setProcessing(false);
    }
  };

  const handleCancelUpdate = () => {
    if (!oldForm) return;

    setForm(oldForm);
    switchModeToView(id);
  };

  //#endregion
  //#region State

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (mode === 'view') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [mode]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const allDisabled = useMemo(() => {
    return disabled || processing || loading;
  }, [disabled, loading, processing]);

  //#endregion
  //#region Deletion

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };
  const handleDelete = async () => {
    if (!id) {
      snackbarAlert('Dịp lễ đã không được xóa', 'warning');
      return;
    }

    setDisabled(true);
    setProcessing(true);
    try {
      const deleted = await OccasionService.DeleteOccasion(Number(id));
      deleted.image && deleteImage(deleted.image);
      snackbarAlert('Dịp lễ đã được xóa thành công', 'success');
      navigate(PageRoute.Occasions.Index);
    } catch (err) {
      console.log(err);
      snackbarAlert('Dịp lễ đã không được xóa', 'warning');
    } finally {
      setDisabled(false);
      setProcessing(false);
    }
  };

  //#endregion

  return (
    <>
      <Stack alignItems={'start'} p={4} gap={4}>
        <Stack direction="row" gap={1}>
          <IconButton
            sx={{
              borderRadius: 4,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              ':hover': {
                backgroundColor: 'primary.dark',
              },
            }}
            onClick={handleNavigateBack}
            disabled={loading || processing}
          >
            <ArrowBack />
          </IconButton>
          <FormTitle>
            {mode === 'create'
              ? 'Thêm dịp'
              : mode === 'edit'
                ? 'Sửa dịp'
                : 'Dịp'}
          </FormTitle>
        </Stack>
        <Grid container columnSpacing={12}>
          <Grid item xs={3}>
            <Stack>
              <FormLabel>Hình ảnh</FormLabel>

              {loading ? (
                <Skeleton
                  width="240px"
                  height="240px"
                  variant="rounded"
                  animation="wave"
                  sx={{
                    borderRadius: 4,
                  }}
                />
              ) : (
                <ImagePicker
                  file={form.image instanceof File ? form.image : null}
                  imagePath={typeof form.image === 'string' ? form.image : ''}
                  onChange={(file) => {
                    setForm((prev) => ({ ...prev, image: file || '' }));
                  }}
                  disabled={disabled}
                />
              )}
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <AdminOccasionForm
              value={form}
              setValue={setForm}
              disabled={disabled}
              loading={loading}
            />
          </Grid>
        </Grid>

        <Divider flexItem sx={{ opacity: 0.5 }} />

        <Stack
          direction="row"
          justifyContent={'end'}
          alignItems={'center'}
          width="100%"
          gap={1}
        >
          {mode === 'create' && (
            <Button
              variant="contained"
              onClick={handleCreateSubmit}
              sx={{ width: 240 }}
              disabled={allDisabled}
            >
              {processing ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Thêm'
              )}
            </Button>
          )}
          {mode === 'view' && (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteDialogOpen}
              sx={{ width: 240 }}
              disabled={processing || loading}
            >
              Xóa
            </Button>
          )}
          {mode === 'view' && (
            <Button
              variant="contained"
              onClick={() => switchModeToEdit()}
              sx={{ width: 240 }}
              disabled={processing || loading}
            >
              Cập nhật
            </Button>
          )}
          {mode === 'edit' && (
            <Button
              variant="contained"
              onClick={() => handleUpdateSubmit()}
              sx={{ width: 240 }}
              disabled={allDisabled}
            >
              {processing ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Cập nhật'
              )}
            </Button>
          )}
          {mode === 'edit' && (
            <Button
              variant="outlined"
              sx={{
                width: 240,
              }}
              onClick={() => handleCancelUpdate()}
              disabled={loading || disabled}
            >
              Hủy
            </Button>
          )}
        </Stack>
      </Stack>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
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
            <Typography typography={'h6'}>Xóa dịp lễ</Typography>
            <IconButton onClick={handleDeleteDialogClose} disabled={loading}>
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
          <DialogContentText>{`Dịp lễ "${
            form?.id || 'loading'
          } - ${form?.name}" sẽ bị xóa!`}</DialogContentText>
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
            onClick={handleDelete}
            disabled={processing}
          >
            {processing ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Xóa'
            )}
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteDialogClose}
            disabled={processing}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminOccasionsCreate;
