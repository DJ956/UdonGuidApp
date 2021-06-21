import { Component, ElementRef, Injectable, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as ons from "onsenui";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { UserLogInRequestModel } from "src/app/model/request/Auth/UserLogInRequest.model";
import { UserRegistryRequestModel } from "src/app/model/request/Auth/UserRegistryRequest.model";
import { UserLogInResponseModel } from "src/app/model/response/Auth/UserLogInResponse.model";
import { UserRegistryResponseModel } from "src/app/model/response/Auth/UserRegistryResponse.model";
import { AuthService } from "src/app/service/AuthService/Auth.service";


@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-LogInContent',
    templateUrl: './LogInContent.component.html',
    styleUrls: ['./LogInContent.component.scss']
})
export class LogInContent implements OnInit {
    @ViewChild('modal') modal: ElementRef;

    /**ユーザ名 */
    userName: string;
    /**パスワード */
    password: string;

    /**新規登録フラグ */
    registryFlg: boolean;
    /**新規用ユーザ名 */
    newUserName: string;
    /**新規用パスワード */
    newPassword: string;
    /**パスワード確認用 */
    repassword: string;

    /**遷移するリンク */
    private forwardLink: string;


    isValid(): boolean {
        if (this.newPassword.length === 0 || this.repassword.length === 0) { return false; }

        if (this.newUserName.length >= 3 && (this.newPassword === this.repassword)) {
            return true;
        } else {
            return false;
        }
    }

    constructor(
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private authService: AuthService,) {
        this.userName = "";
        this.password = "";

        this.newUserName = "";
        this.newPassword = "";
        this.repassword = "";

        this.activatedRouter.queryParams.subscribe((params) => {
            this.forwardLink = params.link;
        });
    }



    ngOnInit(): void {

    }

    /**
     * ログインする。
     */
    async onClicklogin() {
        const request: UserLogInRequestModel = {
            UserName: this.userName,
            Password: this.password
        };

        try {
            const response: UserLogInResponseModel = await this.authService.logIn(request);
            if (response.returnCode === 0 && response.message === '') {
                ons.notification.alert({ title: 'ログイン', messageHTML: 'ユーザのログインに成功しました。' });
                this.onClickCloseModal();
                this.router.navigate([this.forwardLink]);
            } else {
                ons.notification.alert({ title: 'エラー', messageHTML: `${response.message}` });
            }
        } catch (e) {
            ons.notification.alert({ title: 'エラー', messageHTML: CommonApplicationMessage.UNREACHBLE_SERVER });
        }
    }

    /**
     * ユーザの新規登録を行う 
     * 
     * */
    async onClickregistryUser() {
        const request: UserRegistryRequestModel = {
            UserName: this.newUserName,
            Password: this.newPassword
        };
        let response: UserRegistryResponseModel;
        try {
            response = await this.authService.registry(request);
            if (response.returnCode === 0 && response.message === '') {
                ons.notification.alert({ title: 'ユーザ登録', messageHTML: 'ユーザの新規登録に成功しました。' });
                this.onClickCloseModal();
            } else {
                ons.notification.alert({ title: 'エラー', messageHTML: `${response.message}` });
            }
        } catch (e) {
            ons.notification.alert({ title: 'エラー', messageHTML: CommonApplicationMessage.UNREACHBLE_SERVER });
        }
    }

    /**モーダルを開く */
    onClickShowModal() {
        this.modal.nativeElement.show();
    }

    /**モーダルを閉じる */
    onClickCloseModal() {
        this.modal.nativeElement.hide();
    }
}