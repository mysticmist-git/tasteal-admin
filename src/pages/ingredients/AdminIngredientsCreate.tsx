import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';
import { IngredientService } from '@/api/services/ingredientService';
import {
  AdminIngredientForm,
  IngredientForm,
} from '@/components/features/admin';
import { ImagePicker } from '@/components/shared/ui/files/ImagePicker';
import { FormLabel, FormTitle } from '@/components/shared/ui/labels';
import { useSnackbarService } from '@/hooks';
import { PageRoute } from '@/lib/constants/common';
import { deleteImage } from '@/lib/firebase';
import { AdminIngredientHelper } from '@/lib/types/admin/ingredients/AdminIngredientHelper';
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
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const DEFAULT_FORM: IngredientForm = {
  name: '',
  image: '',
  isLiquid: false,
  ratio: 0,
  type_id: 0,
  nutrition_info: {
    calories: 0,
    fat: 0,
    saturated_fat: 0,
    trans_fat: 0,
    cholesterol: 0,
    carbohydrates: 0,
    fiber: 0,
    sugars: 0,
    protein: 0,
    sodium: 0,
    vitaminD: 0,
    calcium: 0,
    iron: 0,
    potassium: 0,
  },
};

const AdminIngredientCreate: FC = () => {
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
    let path: string = PageRoute.Ingredients.Edit(Number(id));
    path = path.replace(':id', form?.id?.toString() || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };
  const switchModeToView = (id?: string) => {
    if (!id) return;

    setMode('view');
    let path: string = PageRoute.Ingredients.View(Number(id));
    path = path.replace(':id', id || '');
    navigate(path, { replace: true, preventScrollReset: true });
  };

  //#endregion
  //#region Navigation

  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigateBack = () => {
    navigate(PageRoute.Ingredients.Index);
  };

  //#endregion
  //#region Form

  const [form, setForm] = useState<IngredientForm>(DEFAULT_FORM);

  const [old, setOld] = useState<IngredientEntity>();
  const [oldForm, setOldForm] = useState<IngredientForm>();

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
        const ingredient = await IngredientService.GetById(parseInt(id));
        if (!active) return;

        const gotForm = AdminIngredientHelper.CreateFormObject(ingredient);
        setForm(gotForm);
        setOld(ingredient);
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
  }, [id]);

  const validate = () => {
    if (!form.name) {
      snackbarAlert('Vui lòng nhập tên nguyên liệu!', 'warning');
      return false;
    }

    if ((mode === 'create' || mode === 'edit') && !form.type_id) {
      snackbarAlert('Vui lòng chọn loại nguyên liệu!', 'warning');
      return false;
    }
    return true;
  };

  const handleCreateSubmit = async () => {
    if (!validate()) return;

    if (!form.image) {
      snackbarAlert('Vui lòng tải ảnh nguyên liệu!', 'warning');
      return;
    }

    setDisabled(true);
    setProcessing(true);
    let createdId = '';
    try {
      const reqBody = await AdminIngredientHelper.CreatePostReq(form);

      const created = await IngredientService.Add(reqBody);
      createdId = created.id.toString();
      snackbarAlert('Nguyên liệu thêm thành công!', 'success');
    } catch (err) {
      snackbarAlert('Nguyên liệu mới đã không được thêm!', 'warning');
      return;
    } finally {
      setDisabled(false);
      setProcessing(false);
      if (!createdId) {
        snackbarAlert('Nguyên liệu đã thêm nhưng id rỗng!');
      }
      switchModeToView(createdId);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!old) return;
    if (!validate()) return;
    if (!form.image) {
      snackbarAlert('Vui loại tải ảnh nguyên liệu!', 'warning');
      return;
    }

    setDisabled(true);
    setProcessing(true);
    try {
      const reqBody = await AdminIngredientHelper.CreatePutReq(form, old);
      await IngredientService.Update(reqBody);

      switchModeToView(id);
      snackbarAlert('Nguyên liệu cập nhật thành công!', 'success');
    } catch (err) {
      console.log(err);
      snackbarAlert('Nguyên liệu đã không được cập nhật', 'warning');
    } finally {
      setDisabled(false);
      setProcessing(false);
    }
  };

  const handleCancelUpdate = () => {
    console.log('run');
    console.log(oldForm);
    if (!oldForm) return;
    console.log('run');

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
      snackbarAlert('Nguyên liệu đã không được xóa', 'warning');
      return;
    }

    setDisabled(true);
    setProcessing(true);
    try {
      const deleted = await IngredientService.DeleteIngredient(Number(id));
      deleted.image && deleteImage(deleted.image);
      snackbarAlert('Nguyên liệu đã được xóa thành công', 'success');
      navigate(PageRoute.Ingredients.Index);
    } catch (err) {
      console.log(err);
      snackbarAlert('Nguyên liệu đã không được xóa', 'warning');
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
            disabled={loading}
          >
            <ArrowBack />
          </IconButton>
          <FormTitle>
            {mode === 'create' ? 'Thêm nguyên liệu' : 'Sửa nguyên liệu'}
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
            <AdminIngredientForm
              value={form}
              setValue={setForm}
              loading={loading}
              disabled={disabled}
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
            <Typography typography={'h6'}>Xóa nguyên liệu</Typography>
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
          <DialogContentText>{`Nguyên liệu "${
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

export default AdminIngredientCreate;
