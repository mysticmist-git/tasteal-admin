import { IngredientPagination } from '@/api/models/dtos/Response/IngredientRes/IngredientRes';
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

type CacheValue<T> = {
  time: number;
  value: T;
};
const cache: Map<string, CacheValue<IngredientPagination>> = new Map();

function createCacheKey(...args: unknown[]) {
  return JSON.stringify(args);
}
function isCacheExpire(time: number) {
  const expire = 5 * 60 * 1000;
  return Date.now() - time > expire;
}

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
  //#region Pagination

  const [rows, setRows] = useState<IngredientEntity[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      let pagination: IngredientPagination;
      const key = createCacheKey(
        paginationModel.page,
        paginationModel.pageSize
      );

      let got = false;
      if (cache.has(key)) {
        const value = cache.get(key);
        if (isCacheExpire(value!.time)) {
          cache.delete(key);
        } else {
          pagination = value!.value;
          got = true;
        }
      }

      if (got) return;

      try {
        pagination = await IngredientService.Get(
          paginationModel.page + 1,
          paginationModel.pageSize
        );

        cache.set(
          createCacheKey(paginationModel.page, paginationModel.pageSize),
          {
            value: pagination,
            time: Date.now(),
          }
        );

        if (!active) return;

        setLoading(false);
        setRows(pagination?.ingredients ?? []);
        setRowCount(
          pagination ? pagination.maxPage * paginationModel.pageSize : 0
        );
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [paginationModel, paginationModel.page, paginationModel.pageSize]);

  //#endregion
  //#region Types

  const [ingredientTypes, setIngredientTypes] = useState<
    Ingredient_TypeEntity[]
  >([]);
  useEffect(() => {
    cache.clear();
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
      paginationModel={paginationModel}
      rowCount={rowCount}
      columns={columns}
      loading={loading}
      dialogProps={{
        title: 'Xóa nguyên liệu',
        content: 'Bạn có chắc muốn xóa nguyên liệu này?',
      }}
      onPaginationModelChange={setPaginationModel}
      onCreateClick={handleCreateRow}
      onViewClick={handleViewRow}
      onDeleteClick={handleDeleteRow}
    />
  );
};
