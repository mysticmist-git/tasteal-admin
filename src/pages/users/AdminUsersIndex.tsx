import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { AccountService } from '@/api/services/accountService';
import { CommonIndexPage } from '@/components/features/admin';
import { useSnackbarService } from '@/hooks';
import { PageRoute } from '@/lib/constants/common';
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminUsersIndex() {
  //#region

  const snackbarAlert = useSnackbarService();

  //#endregion
  //#region Datagrid columns

  const accountColumns: GridColDef[] = [
    {
      field: 'uid',
      headerName: 'UID',
    },
    {
      field: 'name',
      headerName: 'Tên',
    },
    {
      field: 'introduction',
      headerName: 'Giới thiệu',
      flex: 1,
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

  //#region Pagination

  const [rows, setRows] = useState<AccountEntity[]>([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      (async () => {
        let accounts: AccountEntity[];
        try {
          accounts = await AccountService.GetAllUser(1000, 1);
        } catch (err) {
          console.log(err);
          accounts = [];
        }
        if (!active) return;

        setRows(accounts.map((account) => ({ ...account, id: account.uid })));
        setLoading(false);
      })();
    })();

    return () => {
      active = false;
    };
  }, []);

  //#endregion

  const navigate = useNavigate();

  const handleViewClick = (id: any) => {
    navigate(PageRoute.Users.View(id));
  };
  const handleDeleteClick = async (id: any) => {
    setLoading(true);
    try {
      const user = rows.find((row) => row.uid === id);

      if (!user) {
        return;
      }
      const deletedAccount = await AccountService.UpdateUser({
        uid: user.uid,
        isDeleted: !user.isDeleted,
        name: user.name,
        introduction: user.introduction,
        avatar: user.avatar,
        link: user.link,
        slogan: user.slogan,
        quote: user.quote,
      });
      if (deletedAccount) {
        snackbarAlert(`Vô hiệu ${user.name} thành công!`, 'success');
      }
      setRows(
        rows.map((row) =>
          row.uid === user.uid
            ? {
                ...user,
                isDeleted: !user.isDeleted,
              }
            : row
        )
      );
    } catch (err) {
      console.log(err);
      snackbarAlert('Vô hiệu người dùng thất bại!', 'warning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonIndexPage
      title={'Người dùng'}
      rows={rows}
      columns={accountColumns}
      loading={loading}
      dialogProps={{
        title: 'Vô hiệu người dùng',
        content: 'Bạn có chắc muốn vô hiệu ngươi dùng này?',
      }}
      onViewClick={handleViewClick}
      onDeleteClick={handleDeleteClick}
      hideAddButton={true}
    />
  );
}

export default AdminUsersIndex;
