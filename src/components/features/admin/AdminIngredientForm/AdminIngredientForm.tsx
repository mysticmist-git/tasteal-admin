import { Nutrition_InfoReq } from '@/api/models/dtos/Request/Nutrition_InfoReq/Nutrition_InfoReq';
import { Ingredient_TypeEntity } from '@/api/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import { IngredientTypeService } from '@/api/services/ingredientTypeService';
import { FormProps, NutritionInfoTextField } from '@/components/features/admin';
import { FormLabel } from '@/components/shared/ui/labels';
import { TastealTextField } from '@/components/shared/ui/textfields';
import {
  Autocomplete,
  Divider,
  Grid,
  InputAdornment,
  Switch,
} from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useEffect, useMemo, useState } from 'react';

export type IngredientForm = {
  id?: number;
  name: string;
  image: string | File;
  isLiquid: boolean;
  ratio: number;
  type_id: number;
  nutrition_info: Nutrition_InfoReq;
};

export type AdminIngredientFormProps = FormProps<IngredientForm>;

export const AdminIngredientForm: FC<AdminIngredientFormProps> = ({
  value,
  setValue,
  disabled = false,
}) => {
  //#region Types
  const [types, setTypes] = useState<Ingredient_TypeEntity[]>([]);
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const types = await IngredientTypeService.GetAllIngredientTypes();

        if (!active) return;

        setTypes(types);
      } catch (err) {
        console.log(err);
        setTypes([]);
      }
    })();

    return () => {
      active = false;
    };
  }, []);
  //#endregion

  const selectedType: Ingredient_TypeEntity | null = useMemo(() => {
    if (value.type_id <= 0) return null;

    return types.find((type) => type.id === value.type_id) || null;
  }, [types, value.type_id]);

  return (
    <Stack gap={2}>
      <Stack>
        <FormLabel>Tên nguyên liệu</FormLabel>
        <TastealTextField
          placeholder="Táo đen"
          value={value?.name || ''}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, name: e.target.value }))
          }
          disabled={disabled}
        />
      </Stack>
      <Stack>
        <FormLabel>Loại nguyên liệu</FormLabel>
        <Autocomplete
          options={types}
          getOptionLabel={(o) => o?.name || 'Chọn loại nguyên'}
          title="Chọn loại nguyên liệu"
          noOptionsText="Không tìm thấy loại nguyên liệu nào"
          renderInput={(params) => (
            <TastealTextField {...params} label="Chọn loại" />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={selectedType}
          onChange={(_, value) =>
            setValue((prev) => ({
              ...prev,
              type_id: value?.id || 0,
            }))
          }
          disabled={disabled}
        />
      </Stack>
      <Divider flexItem sx={{ opacity: 0.5 }} />
      <Stack>
        <FormLabel>Thành phần dinh dưỡng</FormLabel>
        <Stack gap={2}>
          <NutritionInfoTextField
            label="Calories"
            value={value?.nutrition_info.calories || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  calories: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Chất béo (Fat)"
            unit="g"
            value={value?.nutrition_info.fat || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  fat: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Chất béo bão hóa (Saturated fat)"
            unit="g"
            value={value?.nutrition_info.saturated_fat || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  saturated_fat: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Chất béo trans (Trans fat)"
            unit="g"
            value={value?.nutrition_info.trans_fat || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  trans_fat: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Cholesterol"
            unit="mg"
            value={value?.nutrition_info.cholesterol || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  cholesterol: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Carbohydrates"
            unit="g"
            value={value?.nutrition_info.carbohydrates || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  carbohydrates: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Chất xơ (Fiber)"
            unit="g"
            value={value?.nutrition_info.fiber || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  fiber: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Đường (Sugars)"
            unit="g"
            value={value?.nutrition_info.sugars || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  sugars: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Chất đạm (Protein)"
            unit="g"
            value={value?.nutrition_info.protein || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  protein: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Natri (Sodium)"
            unit="mg"
            value={value?.nutrition_info.sodium || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  sodium: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Vitamin D"
            unit="mcg"
            value={value?.nutrition_info.vitaminD || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  sodium: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Canxi (Calcium)"
            unit="mcg"
            value={value?.nutrition_info.calcium || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  calcium: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Sắt (Iron)"
            unit="mg"
            value={value?.nutrition_info.iron || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  iron: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
          <NutritionInfoTextField
            label="Kali (Potassium)"
            unit="mg"
            value={value?.nutrition_info.potassium || 0}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                nutrition_info: {
                  ...prev.nutrition_info,
                  potassium: Number(e.target.value),
                },
              }))
            }
            disabled={disabled}
          />
        </Stack>
      </Stack>
      <Divider flexItem sx={{ opacity: 0.5 }} />
      <Grid container columnSpacing={1}>
        <Grid item xs={6}>
          <Stack>
            <FormLabel>Tỉ lệ quy đổi</FormLabel>
            <TastealTextField
              placeholder="0.5"
              value={value?.ratio || 0}
              onChange={(e) =>
                setValue((prev) => ({
                  ...prev,
                  ratio: Number(e.target.value),
                }))
              }
              disabled={disabled}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack>
            <FormLabel>Là chất lỏng</FormLabel>
            <Switch
              value={value?.isLiquid || false}
              onChange={(_, checked) =>
                setValue((prev) => ({
                  ...prev,
                  isLiquid: checked,
                }))
              }
              disabled={disabled}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
