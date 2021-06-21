import { Component, ElementRef, Injectable, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UdonShopService } from "src/app/service/UdonShopService/UdonShop.service";

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-AddCommentContent',
    templateUrl: './AddCommentContent.component.html',
    styleUrls: ['./AddCommentContent.component.scss', '../../../app.component.scss']
})
export class AddCommentContent {

    constructor(private shopService: UdonShopService,
        private formBuilder: FormBuilder,
    ) { }

    inputForm: FormGroup = this.formBuilder.group({
        SHOP_NAME: ['', []],
    });


    getShopNameSuggests(): { name: string, id: number }[] {
        return this.shopService.getShopNameSuggest();
    }

}