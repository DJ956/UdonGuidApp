import { Component, Injectable, OnInit } from "@angular/core";
import { LoadingService } from "src/app/service/LoadingService/Loading.service";

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-Loading',
    templateUrl: './Loading.component.html',
    styleUrls: ['./Loading.component.scss']
})
export class LoadingComponent implements OnInit {

    public isLoading = this.loadingService.isLoading.asObservable();

    constructor(private loadingService: LoadingService) { }

    ngOnInit(): void {
    }

}