import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';

export type Recipe_DirectionEntity = {
  recipe_id?: number;
  step?: number;
  direction?: string;
  image?: string;
  RecipeEntity?: RecipeEntity;
};
