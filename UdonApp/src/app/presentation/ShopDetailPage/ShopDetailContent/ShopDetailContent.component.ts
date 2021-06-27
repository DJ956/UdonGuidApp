import { Component, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as ons from "onsenui";
import { Observable } from "rxjs";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { GetAllCommentRequestModel } from "src/app/model/request/Comment/GetAllCommentRequest.model";
import { RemoveCommentRequestModel } from "src/app/model/request/Comment/RemoveCommentRequest.model";
import { ShopCommentModel } from "src/app/model/resource/ShopComment.model";
import { UdonShopModel } from "src/app/model/resource/UdonShop.model";
import { GetAllCommentResponseModel } from "src/app/model/response/Comment/GetAllCommentResponse.model";
import { RemoveCommentResponseModel } from "src/app/model/response/Comment/RemoveCommentResponse.model";
import { AuthService } from "src/app/service/AuthService/Auth.service";
import { ShopCommentsService } from "src/app/service/ShopCommentsService/ShopComments.service";
import { UdonShopService } from "src/app/service/UdonShopService/UdonShop.service";

/**
 * 店舗情報の詳細を表示する
 */
@Component({
    selector: 'app-ShopDetailContent',
    templateUrl: './ShopDetailContent.component.html',
    styleUrls: ['./ShopDetailContent.component.scss', '../../../app.component.scss']
})
@Injectable({
    providedIn: 'root'
})
export class ShopDetailContent implements OnInit {
    /**ショップコメントオブサーバ*/
    shopCommentObserver: Observable<ShopCommentModel[]>;
    /**ショップコメントリスト */
    shopCommentList: ShopCommentModel[];


    /**表示させる店舗情報 */
    udonShop: UdonShopModel;

    constructor(
        private router: Router,
        private authService: AuthService,
        private shopCommentService: ShopCommentsService,
        private udonShopService: UdonShopService) {

        this.udonShop = this.udonShopService.selectedUdonShop;
        this.shopCommentList = [];

        //購読
        this.shopCommentObserver = this.shopCommentService.CommentListObserver;
        this.shopCommentObserver.subscribe((response) => {
            this.shopCommentList = response;
        });
    }


    async ngOnInit() {
        if (this.udonShop === undefined) { return; }
        await this.fetchComment();
    }

    /**
     * コメント取得
     */
    private async fetchComment() {
        const request: GetAllCommentRequestModel = {
            userId: -1,
            accsessToken: 'A',
            shopId: this.udonShop.id
        };
        // コメント取得
        try {
            const response: GetAllCommentResponseModel = await this.shopCommentService.getAllComment(request);
            if (response.returnCode !== 0 || response.message !== '') {
                ons.notification.alert({ title: 'エラー', messageHTML: `エラーコード:${response.errorCode}<br>${response.message}` });
            }
        } catch (e) {
            ons.notification.alert({ title: 'エラー', messageHTML: CommonApplicationMessage.UNREACHBLE_SERVER });
        }
    }

    /**
     * true:コメントの投稿者が自分,falseコメントの投稿者は他人
     * @param userId 
     * @returns 
     */
    isOwnComment(userId: number): boolean {
        if (!this.authService.isLogIn()) { return false; }
        return this.authService.logInInfo.userId === userId;
    }

    /** #TODO:ユーザIDと一致するユーザ名を返す */
    getUserName(userId): string {
        return "";
    }

    /**
     * コメント削除
     * @param shopComment 
     */
    async onClickRemoveComment(shopComment: ShopCommentModel) {
        ons.notification.confirm({
            title: 'コメント削除確認',
            messageHTML: 'コメントを削除しますか?',
            buttonLabels: ['キャンセル', '削除する'],
            callback: async (i) => {
                if (i === 0) { return; }

                const request: RemoveCommentRequestModel = {
                    userId: this.authService.logInInfo.userId,
                    accsessToken: 'A',
                    commentId: shopComment.commentId
                };
                try {
                    const response: RemoveCommentResponseModel = await this.shopCommentService.removeComment(request);
                    if (response.returnCode === 0 && response.message === '') {
                        ons.notification.alert({ title: 'コメント削除', messageHTML: 'コメントを削除しました。' });
                        await this.fetchComment();
                    } else {
                        ons.notification.alert({ title: 'エラー', messageHTML: `エラーコード:${response.errorCode}<br>${response.message}` });
                    }
                } catch (e) {
                    ons.notification.alert({ title: 'エラー', messageHTML: CommonApplicationMessage.UNREACHBLE_SERVER });
                }
            }
        })
    }

    /**
     * コメント追加モーダルを開く
     * ログインしていなければログイン画面へ遷移する。
     */
    onClickShowModal() {
        if (!this.authService.isLogIn()) {
            this.router.navigate(['login'], { queryParams: { link: 'shopDetail' } });
            return;
        }
        this.router.navigate(['addComment'], { queryParams: { link: 'shopDetail', shopId: this.udonShop.id } });
    }
}