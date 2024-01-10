import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';

export type CookBookEntity = {
  id: number;
  name: string;
  owner?: string;
  account?: AccountEntity;
};
