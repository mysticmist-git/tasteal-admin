import { ApiEndPoint } from '@/api/lib/url';
import { CreatePantryItemReq } from '../models/dtos/Request/CreatePantryItemReq/CreatePantryItemReq';
import { GetAllPantryItemReq } from '../models/dtos/Request/GetAllPantryItemReq/GetAllPantryItemReq';
import { Pantry_ItemEntity } from '../models/entities/Pantry_ItemEntity/Pantry_ItemEntity';

export class PantryItemService {
  public static async GetAllPantryItemsByAccountId(
    getAllPantryItemReq: GetAllPantryItemReq
  ): Promise<Pantry_ItemEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(getAllPantryItemReq),
    };

    return await fetch(
      ApiEndPoint.GetAllPantryItemsByAccountId(),
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async GetPantryItemById(
    id: Pantry_ItemEntity['id']
  ): Promise<Pantry_ItemEntity> {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return await fetch(ApiEndPoint.GetPantryItemById(id), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async AddPantryItem(
    newPantryItem: CreatePantryItemReq
  ): Promise<Pantry_ItemEntity> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newPantryItem),
    };

    return await fetch(ApiEndPoint.AddPantryItem(), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async UpdatePantryItem(
    id: Pantry_ItemEntity['id'],
    number: number
  ): Promise<Pantry_ItemEntity> {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        id: id,
        number: number,
      }),
    };

    return await fetch(ApiEndPoint.UpdatePantryItem(), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async DeletePantryItem(
    id: Pantry_ItemEntity['id']
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return await fetch(ApiEndPoint.DeletePantryItem(id), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }
}
