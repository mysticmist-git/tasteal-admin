import { RecipeDirectionReq } from '@/api/models/dtos/Request/RecipeDirectionReq/RecipeDirectionReq';
import { RecipeReq } from '@/api/models/dtos/Request/RecipeReq/RecipeReq';
import { RecipeRes } from '@/api/models/dtos/Response/RecipeRes/RecipeRes';
import { RecipeForm } from '@/components/features/admin';
import { DirectionEditorItemValue } from '@/components/features/recipes/selects/others/DirectionEditor/DirectionEditorItem/DirectionEditorItem';
import { StoragePath } from '@/lib/constants/storage';
import { deleteImage, uploadImage } from '@/lib/firebase';
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
        direction: direction.direction,
        step: direction.step,
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

  static async CreatePutReq(
    form: RecipeForm,
    old: RecipeRes
  ): Promise<RecipeReq> {
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

    // Directions-related logic
    let directionsChange = false;

    // Check for changes in directions
    if (clonedForm.directions.length !== old.directions.length) {
      directionsChange = true;
      console.log('Directions lengths differ, triggering change');
    } else {
      for (let i = 0; i < old.directions.length; i++) {
        if (
          (clonedForm.directions[i].image &&
            clonedForm.directions[i].image instanceof File) ||
          clonedForm.directions[i].direction !== old.directions[i].direction
        ) {
          directionsChange = true;
          console.log('Direction change detected at index', i);
          break;
        }
      }
    }

    if (directionsChange) {
      console.log('Updating directions...');
      // Delete old images
      for (const direction of old.directions) {
        if (direction.image) {
          console.log('Deleting image:', direction.image);
          try {
            await deleteImage(direction.image);
          } catch (err) {
            console.log(err);
          }
        }
      }

      const imageId =
        old.image?.split('/')[1].split('.')[0] ||
        `${clonedForm.name}-${nanoid()}`;
      clonedForm.directions = await resolveDirectionsImage(
        clonedForm.directions,
        imageId
      );
      console.log('Directions updated:', clonedForm.directions);
    }

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
      directions: clonedForm.directions as RecipeDirectionReq[],
      author_note: clonedForm.author_note,
      author: old.author.uid,
      is_private: clonedForm.is_private,
      rating: 0,
    };
    return req;
  }
}
