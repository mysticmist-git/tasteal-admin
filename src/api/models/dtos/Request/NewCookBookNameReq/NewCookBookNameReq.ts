import { CookBookEntity } from '@/api/models/entities/CookBookEntity/CookBookEntity';

export type NewCookBookNameReq = {
  id: CookBookEntity['id'];
  name: CookBookEntity['name'];
};
