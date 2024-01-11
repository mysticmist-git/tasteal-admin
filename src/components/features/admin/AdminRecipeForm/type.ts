export type RecipeForm = {
  id?: number;
  name: string;
  image?: File | string;
  totalTime: number;
  serving_size: number;
  introduction?: string;
  author_note?: string;
  is_private: boolean;
  ingredients: RecipeFormIngredient[];
  directions: RecipeFormDirection[];
  occasions?: number[];
  author: string;
};
export type RecipeFormIngredient = {
  id: number;
  amount: number;
};
export type RecipeFormDirection = {
  step: number;
  direction: string;
  image?: File | string;
};
