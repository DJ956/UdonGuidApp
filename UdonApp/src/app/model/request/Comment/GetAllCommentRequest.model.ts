import { BaseRequestModel } from "../BaseRequest.model";

/**
 * 店舗の全てのコメントを取得するリクエストモデル
 */
export interface GetAllCommentRequestModel extends BaseRequestModel {
    /**アクセストークン */
    accsessToken: string;

    /**店舗ID */
    shopId: number;
}