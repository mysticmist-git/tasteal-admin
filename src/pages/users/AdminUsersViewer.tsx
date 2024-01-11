import { AccountEntity } from "@/api/models/entities/AccountEntity/AccountEntity";
import { AccountService } from "@/api/services/accountService";
import { AdminUserForm } from "@/components/features/admin/AdminUserForm";
import { ImagePicker } from "@/components/shared/ui/files";
import { FormLabel, FormTitle } from "@/components/shared/ui/labels";
import { PageRoute } from "@/lib/constants/common";
import { FormMode } from "@/lib/types/admin/shared";
import { ArrowBack } from "@mui/icons-material";
import { Divider, Grid, IconButton, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DEFAULT_FORM: AccountEntity = {
  uid: "",
  name: "",
  avatar: "",
  introduction: "",
  link: "",
  slogan: "",
  quote: "",
  isDeleted: false,
  id: "",
};

function AdminUsersViewer() {
  //#region Hooks

  const { id } = useParams();

  //#endregion

  //#region Mode

  const [mode, setMode] = useState<FormMode>("view");

  //#endregion

  //#region Navigation

  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(PageRoute.Users.Index);
  };

  //#endregion

  //#region Form
  const [form, setForm] = useState<AccountEntity>(DEFAULT_FORM);

  useEffect(() => {
    if (!id) {
      setMode("view");
      form !== DEFAULT_FORM && setForm(DEFAULT_FORM);
      return;
    }

    let active = true;

    setLoading(true);
    (async () => {
      try {
        console.log("run");
        const user = await AccountService.GetByUid(id);
        console.log(user);
        if (!active) return;

        setForm(user);
      } catch {
        setForm(DEFAULT_FORM);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //#endregion
  //#region State

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (mode === "view") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [mode]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  //#endregion

  return (
    <Stack alignItems={"start"} p={4} gap={4}>
      <Stack direction="row" gap={1}>
        <IconButton
          sx={{
            borderRadius: 4,
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            ":hover": {
              backgroundColor: "primary.dark",
            },
          }}
          onClick={handleNavigateBack}
          disabled={loading || processing}
        >
          <ArrowBack />
        </IconButton>
        <FormTitle>Người dùng</FormTitle>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={"auto"}>
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
                file={null}
                imagePath={typeof form.avatar === "string" ? form.avatar : ""}
                onChange={() => {}}
                disabled={disabled}
              />
            )}
          </Stack>
        </Grid>
        <Grid item xs={true}>
          <AdminUserForm
            value={form}
            setValue={setForm}
            disabled={disabled}
            loading={loading}
          />
        </Grid>
      </Grid>

      <Divider flexItem sx={{ opacity: 0.5 }} />
    </Stack>
  );
}

export default AdminUsersViewer;
