import { ApiEndPoint } from '@/api/lib/url';
import { CommentEntity } from '../models/entities/CommentEntity/CommentEntity';

export class CommentService {
  public static async Create(
    recipeId: number,
    uid: string,
    comment: string
  ): Promise<CommentEntity> {
    const url = ApiEndPoint.CreateComment(recipeId);
    const body = {
      account_id: uid,
      comment: comment,
    };

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  }
  public static async Get(recipeId: number) {
    const url = ApiEndPoint.GetComments(recipeId);
    const res = await fetch(url, {
      method: 'GET',
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  }
}
