import { OccasionEntity } from '@/api/models/entities/OccasionEntity/OccasionEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';

export type Recipe_OccasionEntity = {
  Id: number;
  occasion_id: number;
  recipe_id: number;
  OccasionEntity: OccasionEntity;
  RecipeEntity: RecipeEntity;
};
