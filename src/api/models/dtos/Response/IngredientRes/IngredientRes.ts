import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';
import { Recipe_IngredientEntity } from '@/api/models/entities/Recipe_IngredientEntity/Recipe_IngredientEntity';

export type IngredientRes = {
  id: IngredientEntity['id'];
  name: IngredientEntity['name'];
  image?: IngredientEntity['image'];
  amount?: Recipe_IngredientEntity['amount_per_serving'];
  amount_per_serving: Recipe_IngredientEntity['amount_per_serving'];
  isLiquid: IngredientEntity['isLiquid'];
};

export type IngredientPagination = {
  maxPage: number;
  ingredients: IngredientEntity[];
};
