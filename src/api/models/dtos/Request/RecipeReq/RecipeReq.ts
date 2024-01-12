import { PageReq } from '@/api/models/dtos/Request/PageReq/PageReq';
import { RecipeDirectionReq } from '@/api/models/dtos/Request/RecipeDirectionReq/RecipeDirectionReq';
import { Recipe_IngredientReq } from '@/api/models/dtos/Request/Recipe_IngredientReq/Recipe_IngredientReq';
import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';
import { OccasionEntity } from '@/api/models/entities/OccasionEntity/OccasionEntity';

export type RecipeReq = {
  name: string;
  rating?: number;
  image?: string;
  totalTime?: number;
  active_time?: number;
  serving_size: number;
  introduction?: string;
  author_note?: string;
  is_private: boolean;
  author: string;
  ingredients?: Recipe_IngredientReq[];
  directions?: RecipeDirectionReq[];
  occasions?: OccasionEntity['id'][];
  isDeleted?: boolean;
};

export type RecipeByUids = {
  uids: AccountEntity['uid'][];
  page: PageReq;
};
