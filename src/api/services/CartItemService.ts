import { ApiEndPoint } from '@/api/lib/url';
import { RecipeToCartReq } from '../models/dtos/Request/RecipeToCartReq/RecipeToCartReq';
import { CartEntity } from '../models/entities/CartEntity/CartEntity';
import { Cart_ItemEntity } from '../models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { IngredientEntity } from '../models/entities/IngredientEntity/IngredientEntity';

export class CartItemService {
  public static async GetCartItemsByCartIds(
    cartIds: CartEntity['id'][]
  ): Promise<Cart_ItemEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(cartIds),
    };

    return await fetch(ApiEndPoint.GetCartItemByCartId(), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async UpdateCartItem(
    cartID: CartEntity['id'],
    ingredientId: IngredientEntity['id'],
    isBought: Cart_ItemEntity['isBought']
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return await fetch(
      ApiEndPoint.UpdateCartItem(cartID, ingredientId, isBought),
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        return false;
      });
  }

  public static async AddRecipeToCart(
    recipeToCartReq: RecipeToCartReq
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recipeToCartReq),
    };

    return await fetch(ApiEndPoint.AddRecipeToCart(), requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }
}
