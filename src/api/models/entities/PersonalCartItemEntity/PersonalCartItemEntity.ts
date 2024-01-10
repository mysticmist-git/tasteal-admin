import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { Cart_ItemEntity } from '@/api/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';

export type PersonalCartItemEntity = {
  id: number;
  ingredient_id?: number;
  account_id: string;
  name?: string;
  amount: number;
  is_bought: boolean;
  ingredient: IngredientEntity;
  account: AccountEntity;
};

export const convertPersonalCartItemToCartItem = (
  personalCartItem: PersonalCartItemEntity
) => {
  return {
    cartId: personalCartItem.id,
    ingredient_id: personalCartItem.ingredient_id,
    amount: personalCartItem.amount,
    isBought: personalCartItem.is_bought,
    ingredient: personalCartItem.ingredient,
  } as Cart_ItemEntity;
};
