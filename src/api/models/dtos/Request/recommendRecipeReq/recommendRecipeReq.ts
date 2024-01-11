import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';
import { PageReq } from '../PageReq/PageReq';

export type recommendRecipeReq = {
  IngredientIds: IngredientEntity['id'][];
  Page: PageReq;
};
