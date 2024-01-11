import { FormProps } from '@/components/features/admin';
import { FormLabel } from '@/components/shared/ui/labels';
import { TastealTextField } from '@/components/shared/ui/textfields';
import { Grid, Skeleton, Stack, Switch } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { FC } from 'react';

export type OccasionForm = {
  id?: number;
  name: string;
  description: string;
  start_at: Dayjs;
  end_at: Dayjs;
  is_lunar_date: boolean;
  image: string | File;
};

export type AdminOccasionFormProps = FormProps<OccasionForm>;

export const AdminOccasionForm: FC<AdminOccasionFormProps> = ({
  value,
  setValue,
  disabled = false,
  loading,
}) => {
  return (
    <Stack gap={2}>
      <Stack>
        <FormLabel>Tên dịp lễ</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={60} />
        ) : (
          <TastealTextField
            placeholder="Tết"
            value={value.name}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, name: e.target.value }))
            }
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
            value={value.description}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, description: e.target.value }))
            }
            disabled={disabled}
            placeholder="Tết là một ngày lễ tuyệt vời..."
            multiline
            rows={4}
          />
        )}
      </Stack>
      <Stack>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <FormLabel>Bắt đầu vào</FormLabel>
            {loading ? (
              <Skeleton variant="rounded" animation="wave" height={60} />
            ) : (
              <DatePicker
                value={value.start_at}
                onChange={(value) =>
                  setValue((prev) => ({ ...prev, start_at: value || dayjs() }))
                }
                disabled={disabled}
                sx={{ width: '100%' }}
                format="DD/MM/YYYY"
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <FormLabel>Kết thúc vào</FormLabel>
            {loading ? (
              <Skeleton variant="rounded" animation="wave" height={60} />
            ) : (
              <DatePicker
                value={value.end_at}
                onChange={(value) =>
                  setValue((prev) => ({
                    ...prev,
                    end_at: value || dayjs(),
                  }))
                }
                disabled={disabled}
                sx={{ width: '100%' }}
                format="DD/MM/YYYY"
              />
            )}
          </Grid>
        </Grid>
      </Stack>
      <Stack>
        <FormLabel>Dùng ngày âm</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={32} width={80} />
        ) : (
          <Switch
            value={value.is_lunar_date}
            onChange={(_, checked) =>
              setValue((prev) => ({ ...prev, is_lunar_date: checked }))
            }
            disabled={disabled}
          />
        )}
      </Stack>
    </Stack>
  );
};
