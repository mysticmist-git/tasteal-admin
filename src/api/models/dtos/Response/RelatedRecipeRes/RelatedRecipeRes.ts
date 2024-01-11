import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';
import { Recipe_IngredientEntity } from '@/api/models/entities/Recipe_IngredientEntity/Recipe_IngredientEntity';
import { AuthorRes } from '../AuthorRes/AuthorRes';

export type RelatedRecipeRes = {
  id: RecipeEntity['id'];
  name: RecipeEntity['name'];
  image: RecipeEntity['image'];
  totalTime: RecipeEntity['totalTime'];
  rating: RecipeEntity['rating'];
  ingredientAmount: Recipe_IngredientEntity['amount_per_serving'];
  author: AuthorRes;
};

export function ConvertReleatedRecipeResToRecipeEntity(
  item: RelatedRecipeRes
): RecipeEntity {
  return {
    id: item.id,
    name: item.name,
    image: item.image,
    totalTime: Number(item.totalTime),
    rating: item.rating,
    account: item.author,
    serving_size: 1, // Random
    is_private: false, // Random
    author: item.author.uid,
  };
}
