/**
 * Represents the "N/A" value.
 */
export const N_AValue = 'N/A';

export const ApiPath = 'https://apitasteal.azurewebsites.net';

export const DefaultPage = 1;

export const PageRoute = {
  Index: '/',
  Ingredients: {
    Index: '/ingredients',
    Create: '/ingredients/create',
    View: (id: number) => `/ingredients/${id}`,
    Edit: (id: number) => `/ingredients/${id}/edit`,
  },
  IngredientTypes: {
    Index: '/ingredientTypes',
    Create: '/ingredientTypes/create',
    View: (id: number) => `/ingredientTypes/${id}`,
    Edit: (id: number) => `/ingredientTypes/${id}/edit`,
  },
  Occasions: {
    Index: '/occasions',
    Create: '/occasions/create',
    View: (id: number) => `/occasions/${id}`,
    Edit: (id: number) => `/occasions/${id}/edit`,
  },
  Users: {
    Index: '/users',
  },
} as const;
