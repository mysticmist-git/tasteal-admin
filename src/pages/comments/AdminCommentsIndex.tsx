import { CommentEntity } from '@/api/models/entities/CommentEntity/CommentEntity';
import { CommentService } from '@/api/services/commentService';
import { CommonIndexPage } from '@/components/features/admin';
import { useSnackbarService } from '@/hooks';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

function AdminCommentsIndex() {
  //#region

  const snackbarAlert = useSnackbarService();

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
      valueFormatter: (params) => params.value?.account?.name,
    },
    // {
    //   field: "created_at",
    //   headerName: "Thời gian",
    //   valueFormatter: (params) =>
    //     new Date(params.value?.created_at).toLocaleDateString("vi-VN"),
    // },
    {
      field: 'comment',
      headerName: 'Bình luận ',
      flex: 1,
    },
    {
      field: 'isDeleted',
      headerName: 'Trạng thái',
      valueFormatter: function (params) {
        return params.value ? 'Vô hiệu' : 'Hoạt động';
      },
      flex: 0.5,
    },
  ];

  //#endregion

  //#region Pagination

  const [rows, setRows] = useState<CommentEntity[]>([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      (async () => {
        let comments: CommentEntity[];
        try {
          comments = await CommentService.GetAll(5, 1);
        } catch (err) {
          console.log(err);
          comments = [];
        }
        if (!active) return;

        setRows(comments);
        setLoading(false);
      })();
    })();

    return () => {
      active = false;
    };
  }, []);

  //#endregion

  const handleDeleteClick = async (id: any) => {
    setLoading(true);
    try {
      const comment = rows.find((row) => row.id === id);

      if (!comment) {
        return;
      }
      const deletedAccount = await CommentService.HardDelete(id);
      if (deletedAccount) {
        snackbarAlert(`Xóa comment thành công!`, 'success');
      }
      setRows(rows.filter((row) => row.id !== comment.id));
    } catch (err) {
      console.log(err);
      snackbarAlert('Xóa comment thất bại!', 'warning');
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDeleteClick = async (id: any) => {
    setLoading(true);
    try {
      const comment = rows.find((row) => row.id === id);

      if (!comment) {
        return;
      }
      const deletedAccount = await CommentService.HardDelete(id);
      if (deletedAccount) {
        snackbarAlert(`Vô hiệu comment thành công!`, 'success');
      }
      setRows(
        rows.map((row) =>
          row.id === comment.id
            ? {
                ...comment,
                isDeleted: !comment.isDeleted,
              }
            : row
        )
      );
    } catch (err) {
      console.log(err);
      snackbarAlert('Vô hiệu comment thất bại!', 'warning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonIndexPage
      title={'Bình luận'}
      rows={rows}
      columns={columns}
      loading={loading}
      dialogProps={{
        title: 'Xóa comment?',
        content: 'Bạn có chắc muốn xóa comment này?',
      }}
      // softDialogProps={{
      //   title: "Ẩn comment",
      //   content: "Bạn có chắc muốn ẩn comment này?",
      // }}
      onDeleteClick={handleDeleteClick}
      // onSoftDeleteClick={handleSoftDeleteClick}
      hideAddButton={true}
    />
  );
}

export default AdminCommentsIndex;
