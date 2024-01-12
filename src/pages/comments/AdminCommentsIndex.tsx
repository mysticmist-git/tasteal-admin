import { CommentEntity } from "@/api/models/entities/CommentEntity/CommentEntity";
import { CommentService } from "@/api/services/commentService";
import { CommonIndexPage } from "@/components/features/admin";
import { useSnackbarService } from "@/hooks";
import { PageRoute } from "@/lib/constants/common";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminCommentsIndex() {
  //#region

  const snackbarAlert = useSnackbarService();

  //#endregion

  //#region Datagrid columns

  const accountColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Tên",
    },
    {
      field: "introduction",
      headerName: "Giới thiệu",
      flex: 1,
    },
    {
      field: "isDeleted",
      headerName: "Trạng thái",
      valueFormatter: function (params) {
        return params.value ? "Vô hiệu" : "Hoạt động";
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
          comments = await CommentService.GetAll(2000, 1);
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

  const navigate = useNavigate();
  const handleViewClick = (id: any) => {
    navigate(PageRoute.Comments.View(id));
  };
  const handleDeleteClick = async (id: any) => {
    setLoading(true);
    try {
      const comment = rows.find((row) => row.id === id);

      if (!comment) {
        return;
      }
      const deletedAccount = await CommentService.SoftDelete(id);
      if (deletedAccount) {
        snackbarAlert(`Vô hiệu comment thành công!`, "success");
      }
      setRows(
        rows.map((row) =>
          row.id === comment.id
            ? {
                ...comment,
                isDeleted: true,
              }
            : row
        )
      );
    } catch (err) {
      console.log(err);
      snackbarAlert("Vô hiệu người dùng thất bại!", "warning");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonIndexPage
      title={"Bình luận"}
      rows={rows}
      columns={accountColumns}
      loading={loading}
      dialogProps={{
        title: "Ẩn comment?",
        content: "Bạn có chắc muốn ẩn comment này?",
      }}
      onViewClick={handleViewClick}
      onDeleteClick={handleDeleteClick}
      hideAddButton={true}
    />
  );
}

export default AdminCommentsIndex;
