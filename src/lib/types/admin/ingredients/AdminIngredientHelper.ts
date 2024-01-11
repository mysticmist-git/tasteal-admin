import {
  CreateIngredientReq,
  UpdateIngredientReq,
} from '@/api/models/dtos/Request/IngredientReq/IngredientReq';
import { Nutrition_InfoReq } from '@/api/models/dtos/Request/Nutrition_InfoReq/Nutrition_InfoReq';
import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';
import { Nutrition_InfoEntity } from '@/api/models/entities/Nutrition_InfoEntity/Nutrition_InfoEntity';
import { IngredientForm } from '@/components/features/admin';
import { StoragePath } from '@/lib/constants/storage';
import { uploadImage } from '@/lib/firebase';
import { tasteal_storage } from '@/tasteal_firebase.config';
import { getFileExtension } from '@/utils/file';
import { convertToSnakeCase } from '@/utils/string';
import { getDownloadURL, ref } from '@firebase/storage';
import { nanoid } from 'nanoid';

const DEFAULT_NUTRITION_INFO: Nutrition_InfoReq = {
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
};

export class AdminIngredientHelper {
  static CreateFormObject(entity: IngredientEntity): IngredientForm {
    const getNutrition = (nutrition: Nutrition_InfoEntity | undefined) => {
      if (!nutrition) return DEFAULT_NUTRITION_INFO;
      return {
        calories: nutrition.calories || 0,
        fat: nutrition.fat || 0,
        saturated_fat: nutrition.saturated_fat || 0,
        trans_fat: nutrition.trans_fat || 0,
        cholesterol: nutrition.cholesterol || 0,
        carbohydrates: nutrition.carbohydrates || 0,
        fiber: nutrition.fiber || 0,
        sugars: nutrition.sugars || 0,
        protein: nutrition.protein || 0,
        sodium: nutrition.sodium || 0,
        vitaminD: nutrition.vitaminD || 0,
        calcium: nutrition.calcium || 0,
        iron: nutrition.iron || 0,
        potassium: nutrition.potassium || 0,
      };
    };

    const form: IngredientForm = {
      id: entity.id,
      name: entity.name,
      image: entity.image || '',
      ratio: entity.ratio || 0,
      type_id: entity.type_id || 0,
      isLiquid: entity.isLiquid,
      nutrition_info: getNutrition(entity.nutrition_info),
    };

    return form;
  }

  static async CreatePostReq(
    form: IngredientForm
  ): Promise<CreateIngredientReq> {
    const clonedForm = { ...form };

    if (!(clonedForm.image instanceof File)) {
      throw new Error('invalid image format');
    }

    if (!clonedForm.image) {
      throw new Error('image is required');
    }
    let imagePath = `${StoragePath.INGREDIENT}/${convertToSnakeCase(
      clonedForm.name
    )}`;

    // check if image existed
    let existed = false;
    try {
      const imageRef = ref(
        tasteal_storage,
        `${imagePath}.${getFileExtension(clonedForm.image.name)}`
      );
      await getDownloadURL(imageRef);
      existed = true;
    } catch {
      // ignore
    }

    if (existed) {
      imagePath = `${imagePath}-${nanoid()}.${getFileExtension(
        clonedForm.image.name
      )}`;
    } else {
      imagePath = `${imagePath}.${getFileExtension(clonedForm.image.name)}`;
    }

    // upload image
    clonedForm.image = await uploadImage(clonedForm.image, imagePath);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const req: CreateIngredientReq = {
      name: clonedForm.name,
      ingredient_type: {
        id: clonedForm.type_id,
      },
      isLiquid: clonedForm.isLiquid,
      nutrition_info: {
        ...clonedForm.nutrition_info,
      },
      ratio: clonedForm.ratio,
      image: clonedForm.image,
    };
    return req;
  }

  static async CreatePutReq(
    form: IngredientForm,
    old: IngredientEntity
  ): Promise<UpdateIngredientReq> {
    const clonedForm = { ...form };

    if (!clonedForm.id) {
      throw new Error('invalid id');
    }

    if (clonedForm.image instanceof File) {
      let imagePath = old.image;
      if (imagePath) {
        clonedForm.image = await uploadImage(clonedForm.image, imagePath);
      } else {
        imagePath = `${StoragePath.OCCASION}/${convertToSnakeCase(
          clonedForm.name
        )}.${getFileExtension(clonedForm.image.name)}`;
        // check if image existed
        let existed = false;
        try {
          const imageRef = ref(tasteal_storage, imagePath);
          const path = await getDownloadURL(imageRef);
          if (path) existed = true;
        } catch {
          /* empty */
        }
        if (existed) {
          imagePath = `${imagePath}-${nanoid()}`;
        }

        // upload image
        clonedForm.image = await uploadImage(clonedForm.image, imagePath);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const req: UpdateIngredientReq = {
      id: clonedForm.id,
      name: clonedForm.name,
      image: clonedForm.image,
      ratio: clonedForm.ratio,
      isLiquid: clonedForm.isLiquid,
      ingredient_type: {
        id: clonedForm.type_id,
      },
      nutrition_info: {
        ...clonedForm.nutrition_info,
      },
    };
    return req;
  }
}
