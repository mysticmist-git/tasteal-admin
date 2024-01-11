import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';
import { Ingredient_TypeEntity } from '@/api/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import { IngredientService } from '@/api/services/ingredientService';
import { IngredientTypeService } from '@/api/services/ingredientTypeService';
import { CommonIndexPage } from '@/components/features/admin';
import { useSnackbarService } from '@/hooks';
import { PageRoute } from '@/lib/constants/common';
import { GridColDef } from '@mui/x-data-grid';
import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminIngredientsIndex: FC = () => {
  //#region Hooks

  const navigate = useNavigate();
  const snackbarAlert = useSnackbarService();

  //#endregion
  //#region Navigation

  const handleCreateRow = useCallback(() => {
    navigate(PageRoute.Ingredients.Create);
  }, [navigate]);
  const handleViewRow = useCallback(
    (id: number) => {
      navigate(PageRoute.Ingredients.View(id));
    },
    [navigate]
  );

  //#endregion
  //#region Data Actions

  const handleDeleteRow = async (id: number) => {
    if (!id) {
      snackbarAlert('Nguyên liệu đã không bị xóa!', 'warning');
      return;
    }

    setLoading(true);

    try {
      await IngredientService.DeleteIngredient(id);
      snackbarAlert(`Nguyên này đã bị xóa thành công!`, 'success');
      setRows(rows.filter((row) => row.id !== id));
    } catch (err) {
      console.log(err);
      snackbarAlert('Nguyên liệu đã không bị xóa!', 'warning');
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
      field: 'type_id',
      headerName: 'Loại',
      valueFormatter: function (params) {
        return (
          ingredientTypes.find((type) => type.id === params.value)?.name ||
          'Không tìm thấy'
        );
      },
      flex: 1,
    },
  ];

  //#endregion
  //#region Data

  const [rows, setRows] = useState<IngredientEntity[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      try {
        const rows = await IngredientService.GetAll(1000000);

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
  //#region Types

  const [ingredientTypes, setIngredientTypes] = useState<
    Ingredient_TypeEntity[]
  >([]);
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const types = await IngredientTypeService.GetAllIngredientTypes();
        setIngredientTypes(types);
      } catch (error) {
        console.log(error);
      }
    })();

    if (!active) return;

    return () => {
      active = false;
    };
  }, []);

  //#endregion

  return (
    <CommonIndexPage
      title={'Nguyên liệu'}
      rows={rows}
      columns={columns}
      loading={loading}
      dialogProps={{
        title: 'Xóa nguyên liệu',
        content: 'Bạn có chắc muốn xóa nguyên liệu này?',
      }}
      onCreateClick={handleCreateRow}
      onViewClick={handleViewRow}
      onDeleteClick={handleDeleteRow}
    />
  );
};
