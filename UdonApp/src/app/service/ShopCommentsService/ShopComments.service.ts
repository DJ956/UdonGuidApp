import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CommonApplicationMessage } from "src/app/consts/CommonApplicationMessage";
import { AddCommentRequestModel } from "src/app/model/request/Comment/AddCommentRequest.model";
import { GetAllCommentRequestModel } from "src/app/model/request/Comment/GetAllCommentRequest.model";
import { RemoveCommentRequestModel } from "src/app/model/request/Comment/RemoveCommentRequest.model";
import { ShopCommentModel } from "src/app/model/resource/ShopComment.model";
import { AddCommentResponseModel } from "src/app/model/response/Comment/AddCommentResponse.model";
import { GetAllCommentResponseModel } from "src/app/model/response/Comment/GetAllCommentResponse.model";
import { RemoveCommentResponseModel } from "src/app/model/response/Comment/RemoveCommentResponse.model";
import { ShopCommentsRepository } from "src/app/repository/ShopCommentsRepository/ShopComments.repository";


@Injectable({
    providedIn: 'root'
})
export class ShopCommentsService {

    private _commentListOriginal: ShopCommentModel[];
    private _commentListSubject: Subject<ShopCommentModel[]> = new Subject<ShopCommentModel[]>();
    public CommentListObserver: Observable<ShopCommentModel[]>;

    constructor(private repository: ShopCommentsRepository) {
        this._commentListOriginal = [];
        this.CommentListObserver = this._commentListSubject.asObservable();
    }

    /**
     * コメントを追加する
     * @param request 
     * @returns 
     */
    public addComment(request: AddCommentRequestModel): Promise<AddCommentResponseModel> {
        return new Promise((resolve, rejects) => {
            this.repository.addComment(request).subscribe(
                (response) => {
                    if (response.returnCode === 0 && response.message === '') {
                        resolve(response);
                    } else {
                        rejects(response.message);
                    }
                },
                (error) => {
                    rejects(CommonApplicationMessage.UNREACHBLE_SERVER + "<br>" + ShopCommentsService.name);
                });
        });
    }

    /**
     * コメントを削除する
     * @param request 
     * @returns 
     */
    public removeComment(request: RemoveCommentRequestModel): Promise<RemoveCommentResponseModel> {
        return new Promise((resolve, rejects) => {
            this.repository.removeComment(request).subscribe(
                (response) => {
                    if (response.returnCode === 0 && response.message === '') {
                        resolve(response);
                    } else {
                        rejects(response.message);
                    }
                },
                (error) => {
                    rejects(CommonApplicationMessage.UNREACHBLE_SERVER + "<br>" + ShopCommentsService.name);
                });
        });
    }


    /**
     * 店舗IDをもとにコメントを取得する
     * @param request 
     * @returns 
     */
    public getAllComment(request: GetAllCommentRequestModel): Promise<GetAllCommentResponseModel> {
        return new Promise((resolve, rejects) => {
            this.repository.getAllComment(request).subscribe(
                (response) => {
                    if (response.returnCode === 0 && response.message === '') {
                        this._commentListOriginal = response.list;
                        this._commentListSubject.next(this._commentListOriginal);
                        resolve(response);
                    } else {
                        rejects(response.message);
                    }
                },
                (error) => {
                    rejects(CommonApplicationMessage.UNREACHBLE_SERVER + "<br>" + ShopCommentsService.name);
                });
        });
    }
}