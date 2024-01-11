import {
  OccasionReq,
  OccasionReqPut,
} from '@/api/models/dtos/Request/OccasionReq/OccasionReq';
import { OccasionEntity } from '@/api/models/entities/OccasionEntity/OccasionEntity';
import { OccasionForm } from '@/components/features/admin';
import { StoragePath } from '@/lib/constants/storage';
import { uploadImage } from '@/lib/firebase';
import { tasteal_storage } from '@/tasteal_firebase.config';
import { getFileExtension } from '@/utils/file';
import { convertToSnakeCase } from '@/utils/string';
import dayjs from 'dayjs';
import { getDownloadURL, ref } from 'firebase/storage';
import { nanoid } from 'nanoid';

export class AdminOccasionHelper {
  static CreateFormObject(entity: OccasionEntity): OccasionForm {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      image: entity.image || '',
      start_at: dayjs(entity.start_at),
      end_at: dayjs(entity.end_at),
      is_lunar_date: entity.is_lunar_date,
    };
  }

  static async CreatePostReq(form: OccasionForm): Promise<OccasionReq> {
    const clonedForm = { ...form };

    if (!(clonedForm.image instanceof File)) {
      throw new Error('invalid image format');
    }

    if (!clonedForm.image) {
      throw new Error('image is required');
    }
    let imagePath = `${StoragePath.OCCASION}/${convertToSnakeCase(
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
    const req: OccasionReq = {
      name: clonedForm.name,
      description: clonedForm.description,
      image: clonedForm.image,
      start_at: clonedForm.start_at.toISOString(),
      end_at: clonedForm.end_at.toISOString(),
      is_lunar_date: clonedForm.is_lunar_date,
    };
    return req;
  }

  static async CreatePutReq(
    form: OccasionForm,
    old: OccasionEntity
  ): Promise<OccasionReqPut> {
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
    const req: OccasionReqPut = {
      id: clonedForm.id,
      name: clonedForm.name,
      description: clonedForm.description,
      image: clonedForm.image,
      start_at: clonedForm.start_at.toISOString(),
      end_at: clonedForm.end_at.toISOString(),
      is_lunar_date: clonedForm.is_lunar_date,
    };
    return req;
  }
}
