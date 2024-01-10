import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';
import { PantryEntity } from '@/api/models/entities/PantryEntity/PantryEntity';

export type Pantry_ItemEntity = {
  id: number;
  pantry_id?: number;
  ingredient_id?: number;
  amount: number;
  pantry?: PantryEntity;
  ingredient?: IngredientEntity;
};
