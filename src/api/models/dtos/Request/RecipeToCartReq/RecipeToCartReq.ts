import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';

export type RecipeToCartReq = {
  account_id: AccountEntity['uid'];
  recipe_ids: RecipeEntity['id'][];
};
