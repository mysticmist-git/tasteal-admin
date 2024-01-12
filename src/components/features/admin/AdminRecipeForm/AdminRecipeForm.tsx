import { OccasionEntity } from '@/api/models/entities/OccasionEntity/OccasionEntity';
import { OccasionService } from '@/api/services/occasionService';
import { FormProps, RecipeForm } from '@/components/features/admin';
import IngredientSelector from '@/components/features/recipes/selects/IngredientSelector';
import ServingSizeSelect from '@/components/features/recipes/selects/ServingSizeSelect';
import DirectionEditor from '@/components/features/recipes/selects/others/DirectionEditor';
import ChipsDisplayer, {
  ChipValue,
} from '@/components/shared/displayer/ChipsDisplayer';
import { FormLabel } from '@/components/shared/ui/labels';
import { TastealTextField } from '@/components/shared/ui/textfields';
import { ServingSizes } from '@/lib/constants/options';
import {
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Skeleton,
} from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useEffect, useMemo, useState } from 'react';

export type AdminRecipeFormProps = FormProps<RecipeForm>;

export const AdminRecipeForm: FC<AdminRecipeFormProps> = ({
  value,
  setValue,
  loading,
  disabled = false,
}) => {
  //#region Occasions

  const [occasions, setOccasions] = useState<OccasionEntity[]>([]);
  useEffect(() => {
    OccasionService.GetAll()
      .then((occasions) => setOccasions(occasions))
      .catch(() => setOccasions([]));
  }, []);
  const mappedOccasions = useMemo(() => {
    const _occasions: ChipValue[] = [];
    occasions.forEach((occ) => {
      if (value.occasions?.includes(occ.id))
        _occasions.push({ name: occ.name, id: occ.id });
    });
    return _occasions;
  }, [occasions, value.occasions]);

  //#endregion

  return (
    <Stack gap={4}>
      <Stack>
        <FormLabel>Tên công thức</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={60} />
        ) : (
          <TastealTextField
            value={value.name}
            disabled={disabled}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        )}
      </Stack>
      <Stack>
        <FormLabel>Giới thiệu</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={160} />
        ) : (
          <TastealTextField
            value={value.introduction}
            disabled={disabled}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                introduction: e.target.value,
              }))
            }
            multiline
            rows={5}
            placeholder={`Viết những dòng giới thiệu cho công thức của bạn`}
          />
        )}
      </Stack>
      <Stack gap={1}>
        <FormLabel>Dịp</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={60} />
        ) : (
          <ChipsDisplayer chips={mappedOccasions} disabled={disabled} />
        )}
      </Stack>
      <Stack>
        <FormLabel>Khẩu phần ăn</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={60} />
        ) : (
          <ServingSizeSelect
            disabled={disabled}
            servingSize={value.serving_size}
            sizes={ServingSizes}
            onServingSizeChange={(size) => {
              console.log(size);
              setValue((prev) => ({ ...prev, serving_size: size }));
            }}
          />
        )}
      </Stack>
      <Stack>
        <FormLabel>Nguyên liệu</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={240} />
        ) : (
          <IngredientSelector
            disabled={disabled}
            ingredients={value.ingredients}
            onChange={(ingredients) =>
              setValue((prev) => ({ ...prev, ingredients: ingredients }))
            }
            onOpen={() => {}}
          />
        )}
      </Stack>
      <Stack>
        <FormLabel>Hướng dẫn</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={240} />
        ) : (
          <DirectionEditor
            disabled={disabled}
            directions={value.directions}
            onChange={(directions) =>
              setValue((prev) => ({
                ...prev,
                directions: directions,
              }))
            }
          />
        )}
      </Stack>
      <Stack>
        <FormLabel>Tổng thời gian</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={60} />
        ) : (
          <TastealTextField
            value={value.totalTime}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                totalTime: Number(e.target.value),
              }))
            }
            placeholder="Tổng thời gian"
            type="number"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">phút</InputAdornment>
              ),
            }}
            disabled={disabled}
          />
        )}
      </Stack>
      <Stack>
        <FormLabel>Ghi chú của tác giả</FormLabel>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={92} />
        ) : (
          <TastealTextField
            value={value.author_note}
            disabled={disabled}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, authorNote: e.target.value }))
            }
            multiline
            rows={2}
            placeholder={`Thêm mẹo / lưu ý cho công thức này`}
          />
        )}
      </Stack>
      <>
        {loading ? (
          <Skeleton variant="rounded" animation="wave" height={120} />
        ) : (
          <RadioGroup
            value={value.is_private}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                is_private: e.target.value === 'true',
              }))
            }
            defaultValue={true}
            name="isRecipePrivate"
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Người khác không thể xem"
              disabled={disabled}
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Chia sẻ công thức thông qua link"
              disabled={disabled}
            />
          </RadioGroup>
        )}
      </>
    </Stack>
  );
};

export default AdminRecipeForm;
