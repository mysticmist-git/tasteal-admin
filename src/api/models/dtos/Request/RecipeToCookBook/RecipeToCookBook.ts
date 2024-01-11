import { CookBookEntity } from '@/api/models/entities/CookBookEntity/CookBookEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';

export type RecipeToCookBookReq = {
  cook_book_id: CookBookEntity['id'];
  recipe_id: RecipeEntity['id'];
};
