import { ApiEndPoint } from '@/api/lib/url';
import {
  RecipesIngreAny,
  RecipesPantryAny,
} from '../models/dtos/Request/PantryReq/PantryReq';
import { RecipeEntity } from '../models/entities/RecipeEntity/RecipeEntity';

export class PantryService {
  public static async GetRecipesByIngredientsAny(
    recipesIngreAny: RecipesIngreAny
  ): Promise<RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recipesIngreAny),
    };

    return await fetch(ApiEndPoint.GetRecipesByIngredientsAny(), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async GetRecipesByIngredientsAll(
    recipesIngreAll: RecipesIngreAny
  ): Promise<RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recipesIngreAll),
    };

    return await fetch(ApiEndPoint.GetRecipesByIngredientsAll(), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async GetRecipesByPantryIdAny(
    recipesPantryAny: RecipesPantryAny
  ): Promise<RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recipesPantryAny),
    };

    return await fetch(ApiEndPoint.GetRecipesByPantryIdAny(), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async GetRecipesByPantryIdAll(
    recipesPantryAll: RecipesPantryAny
  ): Promise<RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recipesPantryAll),
    };

    return await fetch(ApiEndPoint.GetRecipesByPantryIdAll(), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }
}
