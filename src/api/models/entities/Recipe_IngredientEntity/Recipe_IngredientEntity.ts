import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';

export type Recipe_IngredientEntity = {
  recipe_id: number;
  ingredient_id: number;
  amount_per_serving?: number;
  note?: string;
  recipe?: RecipeEntity;
  ingredient?: IngredientEntity;
};
