import { Cart_ItemEntity } from '@/api/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { PersonalCartItemEntity } from '@/api/models/entities/PersonalCartItemEntity/PersonalCartItemEntity';

export type PersonalCartItemUpdateReq = {
  id: PersonalCartItemEntity['id'];
  name: PersonalCartItemEntity['name'];
  amount: Cart_ItemEntity['amount'];
  is_bought: Cart_ItemEntity['isBought'];
};
