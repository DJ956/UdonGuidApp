import { environment } from 'src/environments/environment';

export class APIUrl {
    //public static readonly BASE_URL: string = "https://localhost:44398";
    //public static readonly BASE_URL: string = "https://nukomochi.work/udonapi";

    public static readonly BASE_URL: string = `${environment.ApiUrl}`;
}