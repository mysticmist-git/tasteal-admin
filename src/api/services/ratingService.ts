import { ApiEndPoint } from '@/api/lib/url';

export type RatingRes = {
  //   {
  //   "recipe_id": 99,
  //   "rating": 3,
  //   "comments": [
  //     {
  //       "id": 6,
  //       "account_id": "Ah3AvtwmXrfuvGFo8sjSO2IOpCg1",
  //       "rating": 3
  //     }
  //   ]
  // }
  recipe_id: number;
  rating: number;
  comments: Rating[];
};
export type Rating = {
  id: number;
  account_id: string;
  rating: number;
};

class RatingService {
  public static Create(recipeId: number, uid: string, rating: number) {
    return fetch(ApiEndPoint.CreateRating(recipeId), {
      method: 'POST',
      body: JSON.stringify({ account_id: uid, rating: rating }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
  }

  public static Get(recipeId: number): Promise<RatingRes> {
    return fetch(ApiEndPoint.GetRatings(recipeId), {
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
  }

  public static Update(recipeId: number, ratingId: number, rating: number) {
    return fetch(ApiEndPoint.UpdateRating(recipeId, ratingId), {
      method: 'PUT',
      body: JSON.stringify({ rating: rating }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    });
  }
}

export default RatingService;
