import { CreateIngredientReq } from '@/api/models/dtos/Request/IngredientReq/IngredientReq';

export const DEFAULT_INGREDIENT_REQ: CreateIngredientReq = {
  name: '',
  image: '',
  nutrition_info: {
    calories: 0,
    fat: 0,
    saturated_fat: 0,
    trans_fat: 0,
    cholesterol: 0,
    carbohydrates: 0,
    fiber: 0,
    sugars: 0,
    protein: 0,
    sodium: 0,
    vitaminD: 0,
    calcium: 0,
    iron: 0,
    potassium: 0,
  },
  ingredient_type: {
    id: 0,
  },
  ratio: 0,
  isLiquid: false,
};
