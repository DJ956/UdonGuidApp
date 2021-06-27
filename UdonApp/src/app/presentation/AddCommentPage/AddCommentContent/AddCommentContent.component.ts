import { Component, Injectable, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as ons from "onsenui";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { AddCommentRequestModel } from "src/app/model/request/Comment/AddCommentRequest.model";
import { UdonShopModel } from "src/app/model/resource/UdonShop.model";
import { AddCommentResponseModel } from "src/app/model/response/Comment/AddCommentResponse.model";
import { AuthService } from "src/app/service/AuthService/Auth.service";
import { ShopCommentsService } from "src/app/service/ShopCommentsService/ShopComments.service";
import { UdonShopService } from "src/app/service/UdonShopService/UdonShop.service";

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-AddCommentContent',
    templateUrl: './AddCommentContent.component.html',
    styleUrls: ['./AddCommentContent.component.scss', '../../../app.component.scss']
})
export class AddCommentContent implements OnInit {
    /**遷移元のリンク */
    private fromlink: string;
    /** コメントを行う店舗ID */
    private shopId: number;

    shopModel: UdonShopModel;

    constructor(
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private authService: AuthService,
        private commentService: ShopCommentsService,
        private shopService: UdonShopService,
        private formBuilder: FormBuilder,) {
    }

    ngOnInit(): void {
        this.fromlink = "";
        this.shopId = -1;
        // 遷移元のリンクを設定
        this.activatedRouter.queryParams.subscribe(params => {
            this.fromlink = params.link;
            this.shopId = Number.parseInt(params.shopId);
        });

        this.shopModel = this.shopService.findShopById(this.shopId);
        if (this.shopModel !== undefined) {
            this.inputForm.get('SHOP_NAME').setValue(this.shopModel.shopName);
        }
    }

    inputForm: FormGroup = this.formBuilder.group({
        SHOP_NAME: ['', [Validators.required]],
        COMMENT: ['', [Validators.required, Validators.maxLength(500)]],
        TAG: ['', []],
        STAR: [3, [Validators.min(1), Validators.max(5), Validators.required]],
    });


    /**
     * 店舗名候補を取得する
     * @returns 
     */
    getShopNameSuggests(): { name: string, id: number }[] {
        return this.shopService.getShopNameSuggest();
    }

    /**
     * コメントボタンを押下する
     */
    async onClickCommentBtn() {
        const shopName: string = this.inputForm.get('SHOP_NAME').value;
        const comment: string = this.inputForm.get('COMMENT').value;
        const tag: string = this.inputForm.get('TAG').value;
        const star: number = Number.parseInt(this.inputForm.get('STAR').value);

        // 入力した店舗名が存在しない場合
        const shop: UdonShopModel = this.shopService.findShopByName(shopName);
        if (shop === undefined) {
            ons.notification.alert({ title: 'エラー', messageHTML: `入力した店舗名:${shopName}はデータベースに存在しません。` });
            return;
        }

        // 店舗IDを取得する。
        let shopId: number = this.shopModel === undefined ? shop.id : this.shopModel.id;

        const request: AddCommentRequestModel = {
            userId: this.authService.logInInfo.userId,
            AccsessToken: "A",
            ShopComment: {
                userId: this.authService.logInInfo.userId,
                shopId: shopId,
                comment: comment,
                tag: tag,
                star: star,
                commentId: -1
            }
        }

        try {
            const response: AddCommentResponseModel = await this.commentService.addComment(request);
            if (response.returnCode === 0 && response.message === '') {
                ons.notification.alert({ title: 'コメント追加', messageHTML: 'コメントを追加しました。' });
                this.router.navigate([this.fromlink]);
            } else {
                ons.notification.alert({ title: 'エラー', messageHTML: `エラーコード${response.errorCode}<br>${response.message}` });
            }
        } catch (e) {
            ons.notification.alert({ title: 'エラー', messageHTML: CommonApplicationMessage.UNREACHBLE_SERVER });
        }
    }

}