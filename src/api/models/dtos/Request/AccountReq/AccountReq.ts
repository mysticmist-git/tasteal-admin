type AccountReq = {
  uid: string;
  name?: string;
  avatar?: string;
  introduction?: string;
  link?: string;
  slogan?: string;
  quote?: string;
  isDeleted?: boolean;
};

export default AccountReq;
