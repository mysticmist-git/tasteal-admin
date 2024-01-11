import { CookBookEntity } from '@/api/models/entities/CookBookEntity/CookBookEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';

export type CookBook_RecipeEntity = {
  id: number;
  cook_book_id: number;
  recipe_id: number;
  cook_book?: CookBookEntity;
  recipe?: RecipeEntity;
};
