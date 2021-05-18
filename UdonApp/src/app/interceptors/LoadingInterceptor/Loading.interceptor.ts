import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoadingService } from "src/app/service/LoadingService/Loading.service";
import { finalize } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.show();
        return next.handle(req).pipe(
            finalize(() => {
                this.loadingService.close();
            })
        );
    }

}