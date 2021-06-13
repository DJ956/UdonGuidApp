import { ShopCommentModel } from "../../resource/ShopComment.model";
import { BaseResponseModel } from "../BaseResponse.model";

/**
 * 店舗に対するコメント取得するレスポンスモデル
 */
export interface GetAllCommentResponseModel extends BaseResponseModel {
    /**コメントも出るリスト */
    list: ShopCommentModel[];
}