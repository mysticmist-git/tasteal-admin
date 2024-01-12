import { RecipeRes } from '@/api/models/dtos/Response/RecipeRes/RecipeRes';
import { RecipeService } from '@/api/services/recipeService';
import { AdminRecipeForm, RecipeForm } from '@/components/features/admin';
import { ImagePicker } from '@/components/shared/ui/files/ImagePicker';
import { FormLabel, FormTitle } from '@/components/shared/ui/labels';
import { useSnackbarService } from '@/hooks';
import { PageRoute } from '@/lib/constants/common';
import { AdminRecipeHelper } from '@/lib/types/admin/recipes/AdminRecipeHelper';
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
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const DEFAULT_FORM: RecipeForm = {
  name: '',
  image: '',
  serving_size: 1,
  ingredients: [],
  directions: [],
  introduction: '',
  totalTime: 0,
  author_note: '',
  is_private: true,
  author: '',
};

const AdminRecipesCreate: FC = () => {
  //#region Hooks

  const snackbarAlert = useSnackbarService();
  const { id } = useParams();

  //#endregion
  //#region Mode

  const [mode, setMode] = useState<FormMode>('view');

  //#endregion
  //#region Navigation

  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigateBack = () => {
    navigate(PageRoute.Recipes.Index);
  };

  //#endregion
  //#region Form

  const [form, setForm] = useState<RecipeForm>(DEFAULT_FORM);
  const [old, setOld] = useState<RecipeRes>();

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
        const recipe = await RecipeService.GetById(parseInt(id));
        if (!active) return;

        const gotForm = AdminRecipeHelper.CreateFormObject(recipe);
        setForm(gotForm);
        setOld(recipe);
      } catch {
        setForm(DEFAULT_FORM);
        setOld(undefined);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  // const allDisabled = useMemo(() => {
  //   return disabled || processing || loading;
  // }, [disabled, loading, processing]);

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
    if (!id || !old) {
      snackbarAlert('Công thức đã không được xóa', 'warning');
      return;
    }

    setDisabled(true);
    setProcessing(true);
    try {
      const deleteUpdateReq = AdminRecipeHelper.createDeleteUpdateReq(old);
      const deleted = await RecipeService.Update(Number(id), deleteUpdateReq);
      if (!deleted) {
        throw new Error('Delete recipe fail.');
      }
      snackbarAlert('Công thức đã được xóa thành công', 'success');
      setOld((prev) => ({ ...prev!, isDeleted: true }));
      setDeleteDialogOpen(false);
      // navigate(PageRoute.Recipes.Index);
    } catch (err) {
      console.log(err);
      snackbarAlert('Công thức đã không được xóa', 'warning');
    } finally {
      setDisabled(false);
      setProcessing(false);
    }
  };

  const handleRestore = async () => {
    if (!id || !old) {
      snackbarAlert('Công thức đã không được khôi phục', 'warning');
      return;
    }

    setDisabled(true);
    setProcessing(true);
    try {
      const restoreReq = AdminRecipeHelper.createRestoreUpdateReq(old);
      const restored = await RecipeService.Update(Number(id), restoreReq);
      if (!restored) {
        throw new Error('Restore recipe fail.');
      }
      snackbarAlert('Công thức đã được khôi phục thành công', 'success');
      setOld((prev) => ({ ...prev!, isDeleted: false }));
    } catch (err) {
      console.log(err);
      snackbarAlert('Công thức đã không được khôi phục', 'warning');
    } finally {
      setDisabled(false);
      setProcessing(false);
    }
  };

  //#endregion

  console.log(old?.isDeleted);

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
            {mode === 'create'
              ? 'Thêm công thức'
              : mode === 'edit'
                ? 'Sửa công thức'
                : 'Công thức'}
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
            <AdminRecipeForm
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
          {mode === 'view' && !old?.isDeleted && (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteDialogOpen}
              sx={{ width: 240 }}
              disabled={processing || loading || old?.isDeleted}
            >
              Xóa
            </Button>
          )}
          {mode === 'view' && old?.isDeleted && (
            <Button
              variant="contained"
              color="warning"
              onClick={handleRestore}
              sx={{ width: 240 }}
              disabled={processing || loading || !old?.isDeleted}
            >
              {processing ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Khôi phục'
              )}
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
            <Typography typography={'h6'}>Xóa Công thức</Typography>
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
          <DialogContentText>{`Công thức "${
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

export default AdminRecipesCreate;
