import { OccasionEntity } from '@/api/models/entities/OccasionEntity/OccasionEntity';
import { OccasionService } from '@/api/services/occasionService';
import { CommonIndexPage } from '@/components/features/admin';
import { AdminLayout } from '@/components/shared/layout';
import { useSnackbarService } from '@/hooks';
import { PageRoute } from '@/lib/constants/common';
import { GridColDef } from '@mui/x-data-grid';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminOccasionsIndex: FC = () => {
  //#region

  const snackbarAlert = useSnackbarService();

  //#endregion
  //#region Datagrid columns

  const occasionColumns: GridColDef[] = [
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
      field: 'description',
      headerName: 'Miểu tả',
      flex: 1,
    },
  ];

  //#endregion
  //#region Pagination

  const [rows, setRows] = useState<OccasionEntity[]>([]);
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

      (async () => {
        let occasions: OccasionEntity[];
        try {
          occasions = await OccasionService.GetAll();
        } catch (err) {
          console.log(err);
          occasions = [];
        }
        if (!active) return;

        setRows(occasions.sort((a, b) => a.id - b.id));
        setRowCount(occasions.length);
        setLoading(false);
      })();
    })();

    return () => {
      active = false;
    };
  }, [paginationModel, paginationModel.page, paginationModel.pageSize]);

  //#endregion

  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate(PageRoute.Occasions.Create);
  };
  const handleViewClick = (id: number) => {
    navigate(PageRoute.Occasions.View(id));
  };
  const handleDeleteClick = async (id: number) => {
    setLoading(true);
    try {
      const deletedOccasion = await OccasionService.DeleteOccasion(id);
      if (deletedOccasion) {
        snackbarAlert(
          `Dịp ${deletedOccasion.name} đã xóa thành công!`,
          'success'
        );
      }
      setRows(rows.filter((row) => row.id !== id));
    } catch (err) {
      console.log(err);
      snackbarAlert('Dịp đã không được xóa!', 'warning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <CommonIndexPage
        title={'Dịp lễ'}
        rows={rows}
        columns={occasionColumns}
        loading={loading}
        dialogProps={{
          title: 'Xóa dịp lễ',
          content: 'Bạn có chắc muốn xóa dịp lễ này?',
        }}
        paginationModel={paginationModel}
        rowCount={rowCount}
        onPaginationModelChange={setPaginationModel}
        onCreateClick={handleCreateClick}
        onViewClick={handleViewClick}
        onDeleteClick={handleDeleteClick}
      />
    </AdminLayout>
  );
};
