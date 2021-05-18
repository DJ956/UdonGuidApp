import { Subject } from "rxjs";

export class LoadingService {
    isLoading = new Subject<boolean>();

    constructor() { }

    public show(): void {
        this.isLoading.next(true);
    }

    public close(): void {
        this.isLoading.next(false);
    }
}