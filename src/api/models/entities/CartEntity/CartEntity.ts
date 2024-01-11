import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';

export type CartEntity = {
  id: number;
  accountId: string;
  recipeId: number;
  serving_size: number;
  account?: AccountEntity;
  recipe?: RecipeEntity;
};
