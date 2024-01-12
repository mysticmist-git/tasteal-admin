import { RecipeReq } from '@/api/models/dtos/Request/RecipeReq/RecipeReq';
import { RecipeRes } from '@/api/models/dtos/Response/RecipeRes/RecipeRes';
import { RecipeForm } from '@/components/features/admin';

export class AdminRecipeHelper {
  static CreateFormObject(entity: RecipeRes): RecipeForm {
    const form: RecipeForm = {
      id: entity.id,
      name: entity.name || 'Dữ liệu rỗng',
      totalTime: entity.totalTime || 0,
      serving_size: entity.serving_size,
      introduction: entity.introduction,
      author_note: entity.author_note,
      is_private: entity.is_private,
      image: entity.image,
      ingredients: entity.ingredients.map((ingredient) => ({
        id: ingredient.id,
        amount: ingredient.amount || 0,
        isLiquid: ingredient.isLiquid,
      })),
      directions: entity.directions.map((direction) => ({
        step: direction.step || 0,
        direction: direction.direction || '',
        image: direction.image,
      })),
      occasions: entity.occasions?.map((occasion) => occasion.id) || [],
      author: entity.author.uid || '',
    };

    return form;
  }

  static createDeleteUpdateReq(recipe: RecipeRes): RecipeReq {
    const req: RecipeReq = {
      name: recipe.name || '',
      introduction: recipe.introduction,
      serving_size: recipe.serving_size,
      totalTime: recipe.totalTime,
      image: recipe.image,
      occasions: recipe.occasions?.map((o) => o.id) || [],
      ingredients: recipe.ingredients.map((i) => ({
        id: i.id,
        amount: i.amount || 0,
      })),
      directions: recipe.directions.map((d) => ({
        step: d.step || 0,
        direction: d.direction || '',
        image: d.image,
      })),
      author: recipe.author.uid || '',
      is_private: recipe.is_private,
      author_note: recipe.author_note,
      rating: recipe.rating,
      isDeleted: true,
    };
    return req;
  }

  static createRestoreUpdateReq(recipe: RecipeRes): RecipeReq {
    const req: RecipeReq = {
      name: recipe.name || '',
      introduction: recipe.introduction,
      serving_size: recipe.serving_size,
      totalTime: recipe.totalTime,
      image: recipe.image,
      occasions: recipe.occasions?.map((o) => o.id) || [],
      ingredients: recipe.ingredients.map((i) => ({
        id: i.id,
        amount: i.amount || 0,
      })),
      directions: recipe.directions.map((d) => ({
        step: d.step || 0,
        direction: d.direction || '',
        image: d.image,
      })),
      author: recipe.author.uid || '',
      is_private: recipe.is_private,
      author_note: recipe.author_note,
      rating: recipe.rating,
      isDeleted: false,
    };
    return req;
  }
}
