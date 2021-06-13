import { Observable } from "rxjs";
import { AddCommentRequestModel } from "src/app/model/request/Comment/AddCommentRequest.model";
import { GetAllCommentRequestModel } from "src/app/model/request/Comment/GetAllCommentRequest.model";
import { RemoveCommentRequestModel } from "src/app/model/request/Comment/RemoveCommentRequest.model";
import { AddCommentResponseModel } from "src/app/model/response/Comment/AddCommentResponse.model";
import { GetAllCommentResponseModel } from "src/app/model/response/Comment/GetAllCommentResponse.model";
import { RemoveCommentResponseModel } from "src/app/model/response/Comment/RemoveCommentResponse.model";

export abstract class ShopCommentsRepository {

    abstract addComment(request: AddCommentRequestModel): Observable<AddCommentResponseModel>;
    abstract removeComment(request: RemoveCommentRequestModel): Observable<RemoveCommentResponseModel>;
    abstract getAllComment(request: GetAllCommentRequestModel): Observable<GetAllCommentResponseModel>;
}