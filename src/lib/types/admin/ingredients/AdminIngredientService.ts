import {
  CreateIngredientReq,
  UpdateIngredientReq,
} from '@/api/models/dtos/Request/IngredientReq/IngredientReq';

class AdminIngredientService {
  public static CreatePostReqBody(raw: CreateIngredientReq, imageFile: File) {
    return raw;
  }
  public static CreatePutReqBody(raw: UpdateIngredientReq, imageFile?: File) {
    return raw;
  }
}

export default AdminIngredientService;
