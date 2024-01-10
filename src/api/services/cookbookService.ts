import { ApiEndPoint } from '@/api/lib/url';
import { NewCookBookNameReq } from '../models/dtos/Request/NewCookBookNameReq/NewCookBookNameReq';
import { NewCookBookReq } from '../models/dtos/Request/NewCookBookReq/NewCookBookReq';
import { AccountEntity } from '../models/entities/AccountEntity/AccountEntity';
import { CookBookEntity } from '../models/entities/CookBookEntity/CookBookEntity';
export class CookbookService {
  public static async GetAllCookBookByAccountId(
    uid: AccountEntity['uid']
  ): Promise<CookBookEntity[]> {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return await fetch(
      ApiEndPoint.GetAllCookBookByAccountId(uid),
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async DeleteCookBookById(
    id: CookBookEntity['id']
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    return await fetch(ApiEndPoint.DeleteCookBookById(id), requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async AddCookBook(
    newCookBook: NewCookBookReq
  ): Promise<CookBookEntity> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newCookBook),
    };
    return await fetch(ApiEndPoint.AddCookBook(), requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async UpdateCookBookName(
    updateInfor: NewCookBookNameReq
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(updateInfor),
    };
    return await fetch(ApiEndPoint.UpdateCookBookName(), requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Länge:', error);
        throw error;
      });
  }
}
