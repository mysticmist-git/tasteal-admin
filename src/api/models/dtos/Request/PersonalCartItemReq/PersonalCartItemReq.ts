import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { Cart_ItemEntity } from '@/api/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';

export type PersonalCartItemReq = {
  ingredient_id?: IngredientEntity['id'];
  account_id: AccountEntity['uid'];
  name?: string;
  amount: Cart_ItemEntity['amount'];
  is_bought: Cart_ItemEntity['isBought'];
};
