import { CartEntity } from '@/api/models/entities/CartEntity/CartEntity';
import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';

export type Cart_ItemEntity = {
  cartId: number;
  ingredient_id: number;
  amount: number;
  isBought: boolean;
  cart?: CartEntity;
  ingredient?: IngredientEntity;
};
