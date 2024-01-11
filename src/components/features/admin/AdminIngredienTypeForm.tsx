import { FormProps } from '@/components/features/admin';
import { FormLabel } from '@/components/shared/ui/labels';
import { TastealTextField } from '@/components/shared/ui/textfields';
import { Skeleton } from '@mui/material';
import { Stack } from '@mui/system';
import { FC } from 'react';

export type IngredientTypeForm = {
  id?: number;
  name: string;
};

export type AdminIngredientTypeFormProps = FormProps<IngredientTypeForm>;

export const AdminIngredientTypeForm: FC<AdminIngredientTypeFormProps> = ({
  value,
  setValue,
  disabled = false,
  loading = false,
}) => {
  return (
    <Stack gap={2}>
      <Stack>
        <FormLabel>Tên loại nguyên liệu</FormLabel>
        {loading && !disabled ? (
          <Skeleton variant="rounded" animation="wave" width="100%">
            <TastealTextField fullWidth />
          </Skeleton>
        ) : (
          <TastealTextField
            placeholder={loading ? 'loading...' : 'Tên loại nguyên này'}
            value={value?.name || ''}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            disabled={disabled}
          />
        )}
      </Stack>
    </Stack>
  );
};
