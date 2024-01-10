import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';

export type CommentEntity = {
  id: number;
  recipe_id: RecipeEntity['id'];
  account_id: AccountEntity['uid'];
  comment?: string;
  image?: string;
  created_at?: Date;
  updated_at?: Date;
  Recipe: RecipeEntity;
  Account: AccountEntity;
};
