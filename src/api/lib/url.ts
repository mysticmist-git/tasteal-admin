/**
 * The base URL of the API.
 */
export const API_BASE_URL = 'https://apitasteal.azurewebsites.net/';
export const API_VERSION = 'api/v2/';
export const API_PATH = `${API_BASE_URL}${API_VERSION}`;

const CreateUrl = (endpoint: string) => {
  return API_PATH + endpoint;
};

/**
 * List of API endpoints.
 */
export const ApiEndPoint = {
  //
  // Cart
  GetAllCartByAccountId: (accountId: string) =>
    CreateUrl(`Cart/allcart?accountId=${accountId}`),
  DeleteAllCartByAccountId: (accountId: string) =>
    CreateUrl(`Cart/allcart?accountId=${accountId}`),
  UpdateCart: (cartId: number, servingSize: number) =>
    CreateUrl(`Cart/servingsize?cartId=${cartId}&servingSize=${servingSize}`),
  GetCartItemByCartId: () => CreateUrl('Cart/cartitem'),
  DeleteCartById: (id: number) => CreateUrl(`Cart/cart?cartId=${id}`),
  UpdateCartItem: (cartId: number, ingredientId: number, isBought: boolean) =>
    CreateUrl(
      `Cart/cartitemstatus/cartID=${cartId}&ingredientId=${ingredientId}&isBought=${isBought}`
    ),
  GetPersonalCartsByUserId: (uid: string) =>
    CreateUrl(`Cart/personalcarts?userId=${uid}`),
  AddPersonalCart: () => CreateUrl('Cart/personalcart'),
  UpdatePersonalCart: () => CreateUrl('Cart/personalcart'),
  //
  // Cart Item
  AddRecipeToCart: () => CreateUrl('CartItem/add-recipe-cart'),
  //
  // COMMENT
  CreateComment: (recipeId: number) => CreateUrl(`Recipe/${recipeId}/Comments`),
  GetComments: (recipeId: number) => CreateUrl(`Recipe/${recipeId}/Comments`),
  UpdateComment: (recipeId: number, commentId: number) =>
    CreateUrl(`Recipe/${recipeId}/Comments/${commentId}`),
  DeleteComment: (recipeId: number, commentId: number) =>
    CreateUrl(`Recipe/${recipeId}/Comments/${commentId}`),
  //
  // CookBook
  GetAllCookBookByAccountId: (uid: string) =>
    CreateUrl(`CookBook/cookbook?uid=${uid}`),
  DeleteCookBookById: (id: number) => CreateUrl(`CookBook/cookbook?id=${id}`),
  AddCookBook: () => CreateUrl('CookBook/cookbook'),
  GetCookBookRecipeByCookBookId: (cookBookId: number) =>
    CreateUrl(`CookBook/cookbook-recipe?cookBookId=${cookBookId}`),
  DeleteCookBookRecipe: (id: number) =>
    CreateUrl(`CookBook/cookbook-recipe?id=${id}`),
  MoveRecipeToNewCookbook: () => CreateUrl('CookBook/recipetonewcookbook'),
  UpdateCookBookName: () => CreateUrl('CookBook/namecookbook'),
  AddRecipeToCookBook: () => CreateUrl('CookBook/recipetocookbook'),
  //
  // Home
  GetOccasion: () => CreateUrl('Home/getoccasion'),
  GetRecipeByDateTime: () => CreateUrl('Home/recipebydatetime'),
  GetRecipeByRating: () => CreateUrl('Home/recipebyrating'),
  GetMostContributedAccounts: () => CreateUrl('Home/authors'),
  //
  // Ingredient
  GetAllIngredients: () => CreateUrl('Ingredient/getall'),
  GetIngredientById: (id: number) => CreateUrl(`Ingredient/${id}`),
  AddIngredient: () => CreateUrl('Ingredient'),
  DeleteIngredient: (id: number) => CreateUrl(`Ingredient/${id}`),
  UpdateIngredient: (id: number) => CreateUrl(`Ingredient/${id}`),
  //
  // Ingredient Type
  GetAllIngredientTypes: () => CreateUrl('IngredientType/getall'),
  GetIngredientTypeById: (id: number) => CreateUrl(`IngredientType/${id}`),
  DeleteIngredientType: (id: number) => CreateUrl(`IngredientType/${id}`),
  AddIngredientType: () => CreateUrl('IngredientType/create'),
  UpdateIngredientType: () => CreateUrl('IngredientType/update'),
  //
  // Occasion
  GetAllOccasions: () => CreateUrl('Occasion/getAll'),
  GetOccasionById: (id: number) => CreateUrl(`Occasion/${id}`),
  AddOccasion: () => CreateUrl('Occasion'),
  UpdateOccasion: () => CreateUrl('Occasion'),
  DeleteOccasion: (id: number) => CreateUrl(`Occasion/${id}`),
  //
  // Pantry
  GetRecipesByIngredientsAny: () =>
    CreateUrl('Pantry/getRecipesByIngredientsAny'),
  GetRecipesByIngredientsAll: () =>
    CreateUrl('Pantry/getRecipesByIngredientsAll'),
  GetRecipesByPantryIdAny: () => CreateUrl('Pantry/getRecipesByPantryIdAny'),
  GetRecipesByPantryIdAll: () => CreateUrl('Pantry/getRecipesByPantryIdAll'),
  //
  // Pantry Item
  GetAllPantryItemsByAccountId: () => CreateUrl('PantryItem/all_pantry_item'),
  GetPantryItemById: (id: number) =>
    CreateUrl(`PantryItem/pantry_item?id=${id}`),
  AddPantryItem: () => CreateUrl('PantryItem/pantry_item'),
  UpdatePantryItem: () => CreateUrl('PantryItem/pantry_item'),
  DeletePantryItem: (id: number) => CreateUrl(`PantryItem/pantry_item/${id}`),
  //
  // Plan/ Plan Item -> PlanItemService
  GetPlanItemsByAccountId: (accountId: string) =>
    CreateUrl(`Plan?accountId=accountId=${accountId}`),
  AddOrUpdateRecipesToPlan: () => CreateUrl('Plan/addorupdate'),
  DeletePlanItem: () => CreateUrl('Plan'),
  //
  // RATING
  CreateRating: (recipeId: number) => CreateUrl(`Recipe/${recipeId}/Rating`),
  GetRatings: (recipeId: number) => CreateUrl(`Recipe/${recipeId}/Rating`),
  UpdateRating: (recipeId: number, id: number) =>
    CreateUrl(`Recipe/${recipeId}/Rating/${id}`),
  //
  // Recipe
  CreateRecipe: () => CreateUrl('Recipe/Add'),
  UpdateRecipe: (recipeId: number) => CreateUrl(`Recipe/${recipeId}`),
  SearchRecipe: () => CreateUrl('Recipe/Search'),
  GetAllRecipe: () => CreateUrl('Recipe/getall'),
  GetRecipeById: (id: number) => CreateUrl(`Recipe/GetRecipeById?id=${id}`),
  GetRecipesByIds: () => CreateUrl('Recipe/GetRecipesById'),
  GetRecipesByUserId: () => CreateUrl('Recipe/GetRecipesByUserId'),
  GetKeyWords: () => CreateUrl('Recipe/keywords'),
  DeleteRecipe: (id: number) => CreateUrl(`Recipe/recipe?recipeId=${id}`),

  //
  // USER
  SignUpUser: () => CreateUrl('User/signup'),
  UpdateUser: () => CreateUrl('User/updateuser'),
  GetAllUser: () => CreateUrl('User/allusers'),
  GetUserByUid: (uid: string) => CreateUrl('User?accountId=' + uid),
  GetCurrentUser: () => CreateUrl('User'),
} as const;
