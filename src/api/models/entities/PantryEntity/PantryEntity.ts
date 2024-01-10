import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';

export type PantryEntity = {
  id: number;
  account_id: string;
  account?: AccountEntity;
};
