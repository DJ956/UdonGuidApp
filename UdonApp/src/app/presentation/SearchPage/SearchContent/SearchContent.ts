import { Component, Injectable, OnInit } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: "app-SearchContent",
    templateUrl: "./SearchContent.html",
    styleUrls: ["./SearchContent.css"]
})
export class SearchContent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }


    searchTextHange(text: string) {
        console.log(text);
    }

}