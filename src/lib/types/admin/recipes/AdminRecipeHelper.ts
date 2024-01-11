import { RecipeReq } from '@/api/models/dtos/Request/RecipeReq/RecipeReq';
import { RecipeRes } from '@/api/models/dtos/Response/RecipeRes/RecipeRes';
import { RecipeForm } from '@/components/features/admin';
import { DirectionEditorItemValue } from '@/components/features/recipes/selects/others/DirectionEditor/DirectionEditorItem/DirectionEditorItem';
import { StoragePath } from '@/lib/constants/storage';
import { uploadImage } from '@/lib/firebase';
import { tasteal_storage } from '@/tasteal_firebase.config';
import { getFileExtension } from '@/utils/file';
import { convertToSnakeCase } from '@/utils/string';
import { getDownloadURL, ref } from '@firebase/storage';
import { nanoid } from 'nanoid';

const resolveDirectionImage = async (
  direction: DirectionEditorItemValue,
  imageId: string,
  step: number
): Promise<
  Omit<
    {
      recipe_id: number;
      step: number;
      direction: string;
      image: string;
    },
    'recipe_id'
  >
> => {
  const { imageFile, ...others } = direction;

  if (imageFile) {
    try {
      const path = await uploadImage(
        imageFile,
        `${StoragePath.DIRECTION}/${imageId}[${step}].${getFileExtension(
          imageFile.name
        )}`
      );

      return {
        ...others,
        image: path,
      };
    } catch (e) {
      throw new Error('Failed to upload a blob or file!');
    }
  }

  return Promise.resolve({
    ...others,
    image: '',
  });
};

const resolveDirectionsImage = (
  directions: DirectionEditorItemValue[],
  imageId: string
): Promise<
  Omit<
    {
      recipe_id: number;
      step: number;
      direction: string;
      image: string;
    },
    'recipe_id'
  >[]
> => {
  return Promise.all(
    directions.map((dir, index) =>
      resolveDirectionImage(dir, imageId, index + 1)
    )
  );
};

export class AdminRecipeHelper {
  static CreateFormObject(entity: RecipeRes): RecipeForm {
    const form: RecipeForm = {
      id: entity.id,
      name: entity.name || 'Dữ liệu rỗng',
      totalTime: entity.totalTime || 0,
      serving_size: entity.serving_size,
      introduction: entity.introduction,
      author_note: entity.author_note,
      is_private: entity.is_private,
      image: entity.image,
      ingredients: entity.ingredients.map((ingredient) => ({
        id: ingredient.id,
        amount: ingredient.amount || 0,
      })),
      directions: entity.directions.map((direction) => ({
        step: direction.step || 0,
        direction: direction.direction || '',
        image: direction.image,
      })),
      occasions: entity.occasions?.map((occasion) => occasion.id) || [],
      author: entity.author.uid || '',
    };

    return form;
  }

  static async CreatePostReq(
    form: RecipeForm,
    uid: string
  ): Promise<RecipeReq> {
    const clonedForm = { ...form };

    if (!(clonedForm.image instanceof File)) {
      throw new Error('invalid image format');
    }

    if (!clonedForm.image) {
      throw new Error('image is required');
    }
    let imagePath = `${StoragePath.RECIPE}/${convertToSnakeCase(
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

    const directionsWithImage = await resolveDirectionsImage(
      clonedForm.directions,
      clonedForm.image
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const req: RecipeReq = {
      name: clonedForm.name,
      introduction: clonedForm.introduction,
      image: clonedForm.image || undefined,
      totalTime: clonedForm.totalTime,
      serving_size: clonedForm.serving_size,
      occasions: clonedForm.occasions,
      ingredients: clonedForm.ingredients.map((ingredient) => ({
        id: ingredient.id,
        amount: ingredient.amount,
      })),
      directions: directionsWithImage,
      author_note: clonedForm.author_note,
      author: uid,
      is_private: clonedForm.is_private,
      rating: 0,
    };
    return req;
  }
}
