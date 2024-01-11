import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { RecipeEntity } from '@/api/models/entities/RecipeEntity/RecipeEntity';

export type PlanReq = {
  account_id: AccountEntity['uid'];
  date: string;
  recipeIds: RecipeEntity['id'][];
};

export type PlanDeleteReq = {
  account_id: AccountEntity['uid'];
  date: string;
  recipeId: RecipeEntity['id'];
  order: number;
};
