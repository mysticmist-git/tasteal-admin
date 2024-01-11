import { CookBookEntity } from '@/api/models/entities/CookBookEntity/CookBookEntity';

export type CookBookRes = {
  id: CookBookEntity['id'];
  name: CookBookEntity['name'];
};
