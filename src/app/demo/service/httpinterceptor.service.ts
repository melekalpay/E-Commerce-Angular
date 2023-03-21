import {Injectable} from "@angular/core";
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private http: HttpClient) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(sessionStorage.getItem("token") && sessionStorage.getItem("username")){
            const request = req.clone({
                headers: new HttpHeaders({
                    // @ts-ignore
                    'Authorization': sessionStorage.getItem("token")
                })
            });
            return next.handle(request).pipe(
                catchError(err => {
                    if(err instanceof HttpErrorResponse && err.status === 401) {
                        // @ts-ignore
                        this.authService.signout();
                    }
                    return throwError(err);
                })
            );
        }

        return next.handle(req);
        }



}
