import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';

export type PantryItemReq = {
  account_id: AccountEntity['uid'];
  ingredient_id: IngredientEntity['id'];
  number: number;
};
