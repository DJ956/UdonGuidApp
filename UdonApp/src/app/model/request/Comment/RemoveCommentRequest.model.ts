import { BaseRequestModel } from "../BaseRequest.model";

/**
 * コメントを削除するリクエストモデル
 */
export interface RemoveCommentRequestModel extends BaseRequestModel {
    /**アクセストークン */
    accsessToken: string;
    /**削除するコメントID */
    commentId: number;
}