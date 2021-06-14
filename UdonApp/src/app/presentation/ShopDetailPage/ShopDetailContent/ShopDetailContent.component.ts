import { Component, ElementRef, Injectable, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import * as ons from "onsenui";
import { Observable } from "rxjs";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { GetAllCommentRequestModel } from "src/app/model/request/Comment/GetAllCommentRequest.model";
import { ShopCommentModel } from "src/app/model/resource/ShopComment.model";
import { UdonShopModel } from "src/app/model/resource/UdonShop.model";
import { GetAllCommentResponseModel } from "src/app/model/response/Comment/GetAllCommentResponse.model";
import { AuthService } from "src/app/service/AuthService/Auth.service";
import { ShopCommentsService } from "src/app/service/ShopCommentsService/ShopComments.service";
import { UdonShopService } from "src/app/service/UdonShopService/UdonShop.service";

/**
 * 店舗情報の詳細を表示する
 */
@Component({
    selector: 'app-ShopDetailContent',
    templateUrl: './ShopDetailContent.component.html',
    styleUrls: ['./ShopDetailContent.component.css', '../../../app.component.css']
})
@Injectable({
    providedIn: 'root'
})
export class ShopDetailContent implements OnInit {
    @ViewChild('modal') modal: ElementRef;

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
        const request: GetAllCommentRequestModel = {
            userId: this.authService.logInInfo.userId,
            accsessToken: 'A',
            shopId: this.udonShop.id
        };
        // コメント取得
        try {
            const response: GetAllCommentResponseModel = await this.shopCommentService.getAllComment(request);
            if (response.returnCode !== 0 || response.message !== '') {
                ons.notification.alert({ title: 'エラー', messageHTML: `${ShopCommentsService.name}<br>${response.message}` });
            }
        } catch (e) {
            ons.notification.alert({ title: 'エラー', messageHTML: CommonApplicationMessage.UNREACHBLE_SERVER });
        }
    }

    /**
     * コメント追加モーダルを開く
     * ログインしていなければログイン画面へ遷移する。
     */
    onClickShowModal() {
        if (!this.authService.isLogIn()) {
            this.router.navigate(['login'], { queryParams: { link: 'shopDetail' } });
        }
        this.modal.nativeElement.show();
    }

    onClickHideModal() {
        this.modal.nativeElement.hide();
    }

    /**
     * 店舗に対してコメントを追加する
     */
    onClickAddComment() {

    }

}