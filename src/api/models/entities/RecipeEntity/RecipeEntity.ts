import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';
import { Nutrition_InfoEntity } from '@/api/models/entities/Nutrition_InfoEntity/Nutrition_InfoEntity';
import { Recipe_DirectionEntity } from '@/api/models/entities/Recipe_DirectionEntity/Recipe_DirectionEntity';
import { Recipe_OccasionEntity } from '@/api/models/entities/Recipe_OccasionEntity/Recipe_OccasionEntity';

export type RecipeEntity = {
  id: number;
  name?: string;
  rating?: number;
  totalTime?: number;
  active_time?: Date;
  serving_size: number;
  introduction?: string;
  author_note?: string;
  is_private: boolean;
  image?: string;
  author: string;
  nutrition_info_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  account?: AccountEntity;
  nutrition_info?: Nutrition_InfoEntity;
  ingredients?: IngredientEntity[];
  direction?: Recipe_DirectionEntity[];
  occasions?: Recipe_OccasionEntity[];
  calories?: number;
};
