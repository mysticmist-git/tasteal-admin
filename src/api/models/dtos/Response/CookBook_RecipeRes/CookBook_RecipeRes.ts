import { CookBookEntity } from '@/api/models/entities/CookBookEntity/CookBookEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';

export type CookBook_RecipeRes = {
  cook_book_id: CookBookEntity['id'];
  RecipeEntity?: RecipeEntity;
};
