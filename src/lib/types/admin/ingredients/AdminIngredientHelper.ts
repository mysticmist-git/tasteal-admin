import {
  CreateIngredientReq,
  UpdateIngredientReq,
} from '@/api/models/dtos/Request/IngredientReq/IngredientReq';

class AdminIngredientHelper {
  public static CreatePostReqBody(raw: CreateIngredientReq, imageFile: File) {
    return raw;
  }
  public static CreatePutReqBody(raw: UpdateIngredientReq, imageFile?: File) {
    return raw;
  }
}

export default AdminIngredientHelper;
