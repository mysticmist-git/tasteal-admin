import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';
import { OccasionEntity } from '@/api/models/entities/OccasionEntity/OccasionEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';
import { CaloriesReq } from '../CaloriesReq/CaloriesReq';

export type RecipeSearchReq = {
  page?: number;
  pageSize?: number;
  IngredientID?: IngredientEntity['id'][];
  ExceptIngredientID?: IngredientEntity['id'][];
  OccasionID?: OccasionEntity['id'][];
  KeyWords?: string[];
  TotalTime?: RecipeEntity['totalTime'];
  Calories?: CaloriesReq;
};
export const initRecipeSearchReq: RecipeSearchReq = {
  page: null,
  pageSize: null,
  IngredientID: null,
  ExceptIngredientID: null,
  OccasionID: null,
  KeyWords: null,
  TotalTime: null,
  Calories: null,
};

export function isRecipeSearchReqValid(filter: RecipeSearchReq) {
  for (const key in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, key)) {
      const value = filter[key];
      if (value !== null && typeof value !== 'undefined') {
        // If the value is not null or undefined, return true
        return true;
      }
    }
  }
  // If no non-null values are found, return false
  return false;
}
