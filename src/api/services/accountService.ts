import { ApiEndPoint } from '@/api/lib/url';
import { createDebugStringFormatter } from '@/utils/formatter';
import AccountReq from '../models/dtos/Request/AccountReq/AccountReq';
import { PageFilter } from '../models/dtos/Request/PageFilter/PageFilter';
import { PageReq } from '../models/dtos/Request/PageReq/PageReq';
import { AccountEntity } from '../models/entities/AccountEntity/AccountEntity';

const createDebugString = createDebugStringFormatter('AccountService');

const getByUidCache = new Map<string, { data: AccountEntity; time: number }>();

/**
 * Represents a service for managing accounts.
 */
export class AccountService {
  /**
   * Retrieves all occasions.
   *
   * @return {Promise<AccountEntity[]>}
   */
  public static async GetAllUser(
    pageSize: number = 12,
    page: number = 1
  ): Promise<AccountEntity[]> {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        pageSize: pageSize,
        page: page,
      } as PageReq),
    };

    return await fetch(ApiEndPoint.GetAllUser(), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }

  /**
   * Get account by id
   *
   * @param uid - The id of the account
   */
  public static async GetByUid(uid: string): Promise<AccountEntity> {
    if (getByUidCache.has(uid)) {
      const { data, time } = getByUidCache.get(uid)!;
      if (Date.now() - time < 1000 * 60 * 5) {
        return data;
      } else {
        getByUidCache.delete(uid);
      }
    }

    return await fetch(ApiEndPoint.GetUserByUid(uid), {
      method: 'GET',
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        getByUidCache.set(uid, { data: data, time: Date.now() });
        return data;
      })
      .catch((err) => {
        console.log('err', err);
        throw err;
      });
  }

  public static async GetMostContributedAccounts(
    limit: number
  ): Promise<AccountReq[]> {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageSize: limit,
        page: 1,
        isDescend: true,
      } as PageFilter),
    };

    return await fetch(ApiEndPoint.GetMostContributedAccounts(), requestOptions)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }

  /**
   * Create a new account in the database with the UID generated in the Firebase authentication.
   *
   * @param accountReq - Account Request
   */
  public static async SignUpAccount(accountReq: AccountReq): Promise<boolean> {
    try {
      const url = ApiEndPoint.SignUpUser();
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountReq),
      };

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        console.log(createDebugString('User signup success'));
        return true;
      } else {
        console.log(createDebugString('User signup failed'));
        return false;
      }
    } catch (err) {
      console.log(createDebugString('User signup failed'), err);
      return false;
    }
  }

  public static async UpdateUser(userData: AccountReq): Promise<boolean> {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    return await fetch(ApiEndPoint.UpdateUser(), requestOptions)
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }
}
