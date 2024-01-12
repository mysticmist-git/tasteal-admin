import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';
import { AccountService } from '@/api/services/accountService';
import { RecipeService } from '@/api/services/recipeService';
import { CommonIndexPage } from '@/components/features/admin';
import { useSnackbarService } from '@/hooks';
import { PageRoute } from '@/lib/constants/common';
import { AdminRecipeHelper } from '@/lib/types/admin/recipes/AdminRecipeHelper';
import { StarRounded } from '@mui/icons-material';
import { Rating, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminRecipesIndex: FC = () => {
  //#region Hooks

  const navigate = useNavigate();
  const snackbarAlert = useSnackbarService();

  //#endregion
  //#region Navigation

  const handleCreateRow = useCallback(() => {
    navigate(PageRoute.Recipes.Create);
  }, [navigate]);
  const handleViewRow = useCallback(
    (id: number) => {
      navigate(PageRoute.Recipes.View(id));
    },
    [navigate]
  );

  //#endregion
  //#region Data Actions

  const handleDeleteRow = async (id: number) => {
    if (!id) {
      snackbarAlert('công thức đã không bị xóa!', 'warning');
      return;
    }
    const recipe = rows.find((row) => row.id === id);
    if (!recipe) {
      snackbarAlert('công thức đã không bị xóa!', 'warning');
      return;
    }

    setLoading(true);

    try {
      const row = await RecipeService.GetById(recipe.id);
      const deleteReq = AdminRecipeHelper.createDeleteUpdateReq(row);
      const deleted = await RecipeService.Update(id, deleteReq);
      if (deleted) {
        snackbarAlert(`Công thức này đã bị xóa thành công!`, 'success');
        setRows((prev) => {
          const cloned = [...prev];

          const restoredRow = cloned.find((row) => row.id === id);
          if (restoredRow) {
            restoredRow.isDeleted = true;
          }

          return cloned;
        });
      } else {
        throw new Error('Delete recipe fail!');
      }
    } catch (err) {
      console.log(err);
      snackbarAlert('Công thức đã không bị xóa!', 'warning');
    } finally {
      setLoading(false);
    }
  };
  const handleRestoreRow = async (id: number) => {
    if (!id) {
      snackbarAlert('Công thức đã không được khôi phục', 'warning');
      return;
    }

    setLoading(true);

    try {
      const row = await RecipeService.GetById(id);
      const restoreReq = AdminRecipeHelper.createRestoreUpdateReq(row);
      const restored = await RecipeService.Update(Number(id), restoreReq);
      if (!restored) {
        throw new Error('Restore recipe fail.');
      }
      snackbarAlert('Công thức đã được khôi phục thành công', 'success');
      setRows((prev) => {
        const cloned = [...prev];

        const restoredRow = cloned.find((row) => row.id === id);
        if (restoredRow) {
          restoredRow.isDeleted = false;
        }

        return cloned;
      });
    } catch (err) {
      console.log(err);
      snackbarAlert('Công thức đã không được khôi phục', 'warning');
    } finally {
      setLoading(false);
    }
  };

  //#endregion
  //#region Datagrid columns

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: 'Tên',
      flex: 1,
    },
    {
      field: 'introduction',
      headerName: 'Giới thiệu',
      flex: 1,
    },
    {
      field: 'rating',
      headerName: 'Đánh giá',
      renderCell: (params) => (
        <Stack direction="row">
          <Rating
            value={params.row.rating}
            precision={0.5}
            readOnly
            icon={<StarRounded fontSize="inherit" />}
            emptyIcon={<StarRounded fontSize="inherit" />}
            size="small"
          />
        </Stack>
      ),
    },
    {
      field: 'author',
      headerName: 'Tác giả',
      valueFormatter: (params) =>
        authors.find((author) => author.uid === params.value)?.name ||
        'Mặc định',
    },
    {
      field: 'isDeleted',
      headerName: 'Trạng thái',
      renderCell: (params) => (
        <Typography
          color={params.value ? 'error' : 'success'}
          fontWeight={'bold'}
        >
          {params.value ? 'Vô hiệu' : 'Hoạt động'}
        </Typography>
      ),
      flex: 0.5,
    },
  ];

  //#endregion
  //#region Data

  const [rows, setRows] = useState<RecipeEntity[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      try {
        const rows = await RecipeService.GetAllRecipes(1000000);

        if (!active) return;

        setLoading(false);
        setRows(rows ?? []);
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  //#endregion
  //#region Data of Authors

  const [authors, setAuthors] = useState<AccountEntity[]>([]);
  useEffect(() => {
    let active = true;

    (async () => {
      const users = await AccountService.GetAllUser(1000000);

      if (!active) return;
      setAuthors(users || []);
    })();

    return () => {
      active = false;
    };
  }, []);

  //#endregion

  return (
    <CommonIndexPage
      title={'Công thức'}
      rows={rows}
      columns={columns}
      loading={loading}
      dialogProps={{
        title: 'Xóa công thức',
        content: 'Bạn có chắc muốn xóa công thức này?',
      }}
      restoreDialogProps={{
        title: 'Khôi phục công thức',
        content: 'Bạn có chắc muốn khôi phục công thức này?',
      }}
      onCreateClick={handleCreateRow}
      onViewClick={handleViewRow}
      onDeleteClick={handleDeleteRow}
      onRestoreClick={handleRestoreRow}
      canDelete={true}
      hideAddButton
    />
  );
};
