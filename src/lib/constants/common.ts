/**
 * Represents the "N/A" value.
 */
export const N_AValue = 'N/A';

export const ApiPath = 'https://apitasteal.azurewebsites.net';

export const DefaultPage = 1;

export const PageRoute = {
  Index: '/',
  Recipes: {
    Index: '/recipes',
    Create: '/recipes/create',
    View: (id: number) => `/recipes/${id}`,
    Edit: (id: number) => `/recipes/${id}/edit`,
  },
  Ingredients: {
    Index: '/ingredients',
    Create: '/ingredients/create',
    View: (id: number) => `/ingredients/${id}`,
    Edit: (id: number) => `/ingredients/${id}/edit`,
  },
  IngredientTypes: {
    Create: '/ingredient-types/create',
    Index: '/ingredient-types',
    View: (id: number) => `/ingredient-types/${id}`,
    Edit: (id: number) => `/ingredient-types/${id}/edit`,
  },
  Occasions: {
    Index: '/occasions',
    Create: '/occasions/create',
    View: (id: number) => `/occasions/${id}`,
    Edit: (id: number) => `/occasions/${id}/edit`,
  },
  Users: {
    Index: '/users',
    Create: '/users/create',
    View: (id: number) => `/users/${id}`,
    Edit: (id: number) => `/users/${id}/edit`,
  },
  Comments: {
    Index: '/comments',
    View: (id: number) => `/comments/${id}`,
    Edit: (id: number) => `/comments/${id}/edit`,
  },
} as const;
