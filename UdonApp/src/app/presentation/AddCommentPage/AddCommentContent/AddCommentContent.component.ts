import { Component, ElementRef, Injectable, ViewChild } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-AddCommentContent',
    templateUrl: './AddCommentContent.component.html',
    styleUrls: ['./AddCommentContent.component.css']
})
export class AddCommentContent {
    @ViewChild('modal') modal: ElementRef;

    constructor() { }

    public onClickShow() {
        this.modal.nativeElement.show();
    }

    public onClickHide() {
        this.modal.nativeElement.hide();
    }

}