import { ShopCommentModel } from "../../resource/ShopComment.model";
import { BaseRequestModel } from "../BaseRequest.model";

/**
 * 店舗に対するコメント追加リクエストモデル
 */
export interface AddCommentRequestModel extends BaseRequestModel {
    /**アクセストークン */
    AccsessToken: string;

    /**投稿コメントモデル */
    ShopComment: ShopCommentModel;
}