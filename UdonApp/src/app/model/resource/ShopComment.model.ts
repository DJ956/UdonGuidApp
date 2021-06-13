export interface ShopCommentModel {

    /**コメントのID */
    commentId: number;

    /**店舗ID */
    shopId: number;

    /**投稿したユーザID */
    userId: number;

    /**店舗に対するコメント */
    comment: string;

    /**コメントタグ */
    tag: string;

    /**評価1～5 */
    star: number;
}