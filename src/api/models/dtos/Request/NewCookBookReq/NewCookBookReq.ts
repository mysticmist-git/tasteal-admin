import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';

export type NewCookBookReq = {
  name: string;
  owner: AccountEntity['uid'];
};
