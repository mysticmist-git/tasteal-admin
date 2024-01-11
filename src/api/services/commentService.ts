import { ApiEndPoint } from "@/api/lib/url";
import { CommentEntity } from "../models/entities/CommentEntity/CommentEntity";
import { PageReq } from "../models/dtos/Request/PageReq/PageReq";

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
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
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
      method: "GET",
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  }
  public static async GetAll(
    pageSize: number = 12,
    page: number = 1
  ): Promise<CommentEntity[]> {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        pageSize: pageSize,
        page: page,
      } as PageReq),
    };

    return await fetch(ApiEndPoint.GetAllComments(), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }

  public static async SoftDelete(id: number) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    return await fetch(ApiEndPoint.SoftDelete(id), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }

  public static async HardDelete(id: number) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    return await fetch(ApiEndPoint.HardDelete(id), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }
}
