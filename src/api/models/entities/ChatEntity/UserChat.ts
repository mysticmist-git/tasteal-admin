import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { AccountEntity } from '../AccountEntity/AccountEntity';

type ChatWithType = {
  id: string;
  date: Date;
  userInfor: AccountEntity;
  lastMessage: string;
  isRead: boolean;
};

type UserChat = {
  uid: string;
  chatWith: ChatWithType[];
};

const userChatConverter: FirestoreDataConverter<UserChat> = {
  toFirestore: (obj: UserChat) => {
    // const { uid, ...data } = obj;

    return obj;
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions | undefined
  ) => {
    const data = snapshot.data(options);

    const object = {
      ...data,
      uid: snapshot.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chatWith: data.chatWith.map((item: any) => {
        return {
          id: item.id,
          date: item.date.toDate(),
          userInfor: item.userInfor,
          lastMessage: item.lastMessage,
          isRead: item.isRead,
        } as ChatWithType;
      }),
    } as UserChat;

    return object;
  },
};

export default UserChat;
export { userChatConverter };
export type { ChatWithType, UserChat };
