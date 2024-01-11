import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';
import { AccountService } from '@/api/services/accountService';
import { RecipeService } from '@/api/services/recipeService';
import { CommonIndexPage } from '@/components/features/admin';
import { useSnackbarService } from '@/hooks';
import { PageRoute } from '@/lib/constants/common';
import { StarRounded } from '@mui/icons-material';
import { Rating, Stack } from '@mui/material';
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

    setLoading(true);

    try {
      await RecipeService.Delete(id);
      snackbarAlert(`Công thức này đã bị xóa thành công!`, 'success');
      setRows(rows.filter((row) => row.id !== id));
    } catch (err) {
      console.log(err);
      snackbarAlert('Công thức đã không bị xóa!', 'warning');
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
  ];

  //#endregion
  //#region Data

  const [rows, setRows] = useState<RecipeEntity[]>([]);
  const [rowCount, setRowCount] = useState(0);
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
        setRowCount(rows.length || 0);
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
      rowCount={rowCount}
      columns={columns}
      loading={loading}
      dialogProps={{
        title: 'Xóa công thức',
        content: 'Bạn có chắc muốn xóa công thức này?',
      }}
      onCreateClick={handleCreateRow}
      onViewClick={handleViewRow}
      onDeleteClick={handleDeleteRow}
    />
  );
};