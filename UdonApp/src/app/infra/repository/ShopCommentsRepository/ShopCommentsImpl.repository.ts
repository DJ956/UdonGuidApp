import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APIUrl } from "src/app/consts/APIUrl";
import { AddCommentRequestModel } from "src/app/model/request/Comment/AddCommentRequest.model";
import { GetAllCommentRequestModel } from "src/app/model/request/Comment/GetAllCommentRequest.model";
import { RemoveCommentRequestModel } from "src/app/model/request/Comment/RemoveCommentRequest.model";
import { AddCommentResponseModel } from "src/app/model/response/Comment/AddCommentResponse.model";
import { GetAllCommentResponseModel } from "src/app/model/response/Comment/GetAllCommentResponse.model";
import { RemoveCommentResponseModel } from "src/app/model/response/Comment/RemoveCommentResponse.model";
import { ShopCommentsRepository } from "src/app/repository/ShopCommentsRepository/ShopComments.repository";

@Injectable({
    providedIn: 'root'
})
export class ShopCommentsImplRepository extends ShopCommentsRepository {

    constructor(private client: HttpClient) {
        super();
    }

    addComment(request: AddCommentRequestModel): Observable<AddCommentResponseModel> {
        return this.client.post<AddCommentResponseModel>(`${APIUrl.BASE_URL}/api/ShopComment/addComment`, request);
    }

    removeComment(request: RemoveCommentRequestModel): Observable<RemoveCommentResponseModel> {
        return this.client.post<RemoveCommentResponseModel>(`${APIUrl.BASE_URL}/api/ShopComment/removeComment`, request);
    }

    getAllComment(request: GetAllCommentRequestModel): Observable<GetAllCommentResponseModel> {
        return this.client.post<GetAllCommentResponseModel>(`${APIUrl.BASE_URL}/api/ShopComment/getAllComment`, request);
    }

}