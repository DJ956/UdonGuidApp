import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as ons from 'onsenui';
import { CommonApplicationMessage } from 'src/app/consts/CommonApplicationMessage';
import { UserLogOutRequestModel } from 'src/app/model/request/Auth/UserLogOutRequest.model';
import { AuthService } from 'src/app/service/AuthService/Auth.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-HomePage',
  templateUrl: './HomePage.html',
  styleUrls: ['./HomePage.scss']
})
export class HomePage {
  constructor(
    private router: Router,
    private authService: AuthService,) { }

  /**
   * true:ログイン済み,false:未ログイン
   * @returns 
   */
  isLogin(): boolean {
    return this.authService.isLogIn();
  }

  /**
   * ログイン済みならログアウトする
   * ログアウト後、ルートページへ遷移する。
   */
  async onClickLogOutBtn() {
    const request: UserLogOutRequestModel = {
      userId: this.authService.logInInfo.userId,
      accsessToken: 'A'
    };
    try {
      const response = await this.authService.logOut(request);
      if (response.returnCode === 0 && response.message === '') {
        this.router.navigate(['']);
      } else {
        ons.notification.alert({ title: 'エラー', messageHTML: `エラーコード:${response.errorCode}<br>${response.message}` });
      }
    } catch (e) {
      ons.notification.alert({ title: 'エラー', messageHTML: CommonApplicationMessage.UNREACHBLE_SERVER });
    }
  }

  /**
   * ログインページへ遷移する。
   */
  onClickLogInBtn() {
    this.router.navigate(['login']);
  }

}
