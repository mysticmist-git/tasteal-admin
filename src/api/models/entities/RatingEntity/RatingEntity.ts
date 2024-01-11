import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';

export type RatingEntity = {
  id: number;
  recipe_id: number;
  account_id: string;
  rating: number;
  account?: AccountEntity;
  recipe?: RecipeEntity;
};
