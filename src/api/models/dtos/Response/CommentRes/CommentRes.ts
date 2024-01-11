import { AccountEntity } from '@/api/models/entities/AccountEntity/AccountEntity';

export type CommentRes = {
  id: number;
  account_id: AccountEntity['uid'];
  name: AccountEntity['name'];
  comment: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
};
