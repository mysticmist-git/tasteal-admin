import { AccountEntity } from "@/api/models/entities/AccountEntity/AccountEntity";
import { FormProps } from "@/components/features/admin";
import { FormLabel } from "@/components/shared/ui/labels";
import { TastealTextField } from "@/components/shared/ui/textfields";
import { Grid, Skeleton, Stack } from "@mui/material";

export type AdminUserFormProps = FormProps<AccountEntity>;

import { FC } from "react";

export const AdminUserForm: FC<AdminUserFormProps> = ({
  value,
  disabled = true,
  loading,
}) => {
  return (
    <Stack gap={2}>
      <Stack>
        <FormLabel>Tên</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={60} />
        ) : (
          <TastealTextField
            placeholder="Tết"
            value={value.name}
            disabled={disabled}
          />
        )}
      </Stack>
      <Stack>
        <FormLabel>Mô tả</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={124} />
        ) : (
          <TastealTextField
            value={value.introduction}
            disabled={disabled}
            placeholder="Tôi là một thành viên của Tasteal"
            multiline
            rows={4}
          />
        )}
      </Stack>
      <Stack>
        <FormLabel>Triết lý</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={124} />
        ) : (
          <TastealTextField value={value.quote} disabled={disabled} />
        )}
      </Stack>
      <Stack>
        <FormLabel>Khẩu hiệu</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={124} />
        ) : (
          <TastealTextField value={value.slogan} disabled={disabled} />
        )}
      </Stack>

      <Stack>
        <FormLabel>Liên kết</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={124} />
        ) : (
          <TastealTextField value={value.link} disabled={disabled} />
        )}
      </Stack>

      <Stack>
        <FormLabel>Trạng thái</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={124} />
        ) : (
          <TastealTextField
            value={value.isDeleted ? "Vô hiệu" : "Hoạt động"}
            disabled={disabled}
          />
        )}
      </Stack>
    </Stack>
  );
};
