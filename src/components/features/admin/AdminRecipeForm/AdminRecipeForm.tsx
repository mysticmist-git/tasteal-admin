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
  Autocomplete,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

export type AdminRecipeFormProps = FormProps<RecipeForm>;

export const AdminRecipeForm: FC<AdminRecipeFormProps> = ({
  value,
  setValue,
  loading,
  disabled = false,
}) => {
  //#region Occasions

  const [occasions, setOccasions] = useState<OccasionEntity[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<ChipValue[]>([]);

  const filterOccasions = useCallback(
    (occasions: ChipValue[]) => {
      return occasions.filter((occasion) => {
        return !selectedOccasions.some(
          (selectedOccasion) => selectedOccasion.id === occasion.id
        );
      });
    },
    [selectedOccasions]
  );

  const filteredOccasions = useMemo(() => {
    return filterOccasions(occasions);
  }, [filterOccasions, occasions]);

  const handleSelectedOccasionsChange = useCallback((value: ChipValue[]) => {
    setSelectedOccasions(value);
  }, []);

  const handleSelectOccasion = useCallback((value: ChipValue | null) => {
    if (value) {
      setSelectedOccasions((prev) => [...prev, value]);
    }
  }, []);

  useEffect(() => {
    OccasionService.GetAll()
      .then((occasions) => setOccasions(occasions))
      .catch(() => setOccasions([]));
  }, []);

  //#endregion
  //#region Dialog

  const [ingredientDialog, setIngredientDialog] = useState(false);

  //#endregion

  return (
    <Stack gap={4}>
      <Stack>
        <FormLabel>Tên công thức</FormLabel>
        <TastealTextField
          value={value.name}
          disabled={disabled}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </Stack>
      <Stack>
        <FormLabel>Giới thiệu (Không bắt buộc)</FormLabel>
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
      </Stack>
      <Stack gap={1}>
        <FormLabel>Dịp</FormLabel>
        <Autocomplete
          disabled={disabled}
          options={filteredOccasions}
          getOptionLabel={(o) => o.name}
          title="Chọn dịp"
          noOptionsText="Không tìm thấy dịp lễ nào"
          renderInput={(params) => (
            <TastealTextField {...params} label="Chọn dịp" />
          )}
          onChange={(_, value) => handleSelectOccasion(value)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
        <ChipsDisplayer
          chips={
            selectedOccasions.length > 0
              ? selectedOccasions
              : [{ id: 0, name: 'Không thuộc dịp nào' }]
          }
          onChange={handleSelectedOccasionsChange}
          disabled={disabled}
        />
      </Stack>
      <Stack>
        <FormLabel>Khẩu phần ăn</FormLabel>
        <ServingSizeSelect
          disabled={disabled}
          servingSize={value.serving_size}
          sizes={ServingSizes}
          onServingSizeChange={(size) => () =>
            setValue((prev) => ({ ...prev, serving_size: size }))
          }
        />
      </Stack>
      <Stack>
        <FormLabel>Nguyên liệu</FormLabel>
        <IngredientSelector
          disabled={disabled}
          ingredients={value.ingredients}
          onChange={(ingredients) =>
            setValue((prev) => ({ ...prev, ingredients: ingredients }))
          }
          onOpen={() => setIngredientDialog(true)}
        />
      </Stack>
      <Stack>
        <FormLabel>Hướng dẫn</FormLabel>
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
      </Stack>
      <Stack>
        <FormLabel>Tổng thời gian</FormLabel>
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
            endAdornment: <InputAdornment position="end">phút</InputAdornment>,
          }}
          disabled={disabled}
        />
      </Stack>
      <Stack>
        <FormLabel>Ghi chú của tác giả (Không bắt buộc)</FormLabel>
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
      </Stack>
      <>
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
      </>
    </Stack>
  );
};

export default AdminRecipeForm;
