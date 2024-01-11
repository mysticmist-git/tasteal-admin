import { AccountEntity } from "@/api/models/entities/AccountEntity/AccountEntity";
import { OccasionService } from "@/api/services/occasionService";
import { useSnackbarService } from "@/hooks";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

function AdminUsersIndex() {
  //#region

  const snackbarAlert = useSnackbarService();

  //#endregion
  //#region Datagrid columns

  const occasionColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Miểu tả",
      flex: 1,
    },
  ];

  //#endregion

  //#region Pagination

  const [rows, setRows] = useState<AccountEntity[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   let active = true;

  //   (async () => {
  //     setLoading(true);

  //     (async () => {
  //       let accounts: AccountEntity[];
  //       try {
  //         accounts = await OccasionService.GetAll();
  //       } catch (err) {
  //         console.log(err);
  //         accounts = [];
  //       }
  //       if (!active) return;

  //       setRows(accounts.sort((a, b) => a.id - b.id));
  //       setRowCount(accounts.length);
  //       setLoading(false);
  //     })();
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [paginationModel, paginationModel.page, paginationModel.pageSize]);

  //#endregion
  return <div>AdminUsersIndex</div>;
}

export default AdminUsersIndex;
