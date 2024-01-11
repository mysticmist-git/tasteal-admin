import { IngredientTypePostReq } from '@/api/models/dtos/Request/IngredientTypeReq/IngredientTypePostReq';
import { IngredientTypePutReq } from '@/api/models/dtos/Request/IngredientTypeReq/IngredientTypePutReq';
import { Ingredient_TypeEntity } from '@/api/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import { IngredientTypeForm } from '@/components/features/admin';

export class AdminIngredientTypeHelper {
  static CreateFormObject(entity: Ingredient_TypeEntity): IngredientTypeForm {
    return {
      id: entity.id,
      name: entity.name,
    };
  }

  static async CreatePostReq(
    form: IngredientTypeForm
  ): Promise<IngredientTypeForm> {
    const clonedForm = { ...form };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const req: IngredientTypePostReq = {
      name: clonedForm.name,
    };
    return req;
  }

  static async CreatePutReq(
    form: IngredientTypeForm
  ): Promise<IngredientTypePutReq> {
    if (!form.id || form.id <= 0) {
      throw new Error('invalid id');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const req: IngredientTypePutReq = {
      id: form.id,
      name: form.name,
    };
    return req;
  }
}
