import { Ingredient_TypeEntity } from '@/api/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import { Nutrition_InfoEntity } from '@/api/models/entities/Nutrition_InfoEntity/Nutrition_InfoEntity';

export type IngredientEntity = {
  id: number;
  name: string;
  image?: string;
  nutrition_info_id?: number;
  type_id?: number;
  isLiquid: boolean;
  ratio?: number;
  note?: string;
  ingredient_type?: Ingredient_TypeEntity;
  nutrition_info?: Nutrition_InfoEntity;
};
