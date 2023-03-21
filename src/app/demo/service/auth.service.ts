import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
    providedIn : 'root'
})
export class AuthService {

    private baseUrl = 'http://localhost:8080/';

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

    signin(request: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'signin', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(map((resp) => {
            sessionStorage.setItem('user', request.userName);
            sessionStorage.setItem('token', resp.accessToken);
            return resp;
        }));
    }

    signup(request: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'signup', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'}).pipe(map((resp) => {
            return resp;
        }));
    }

    signout() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');

        this.router.navigateByUrl('login');
    }

    isUserSignedin() {
        return sessionStorage.getItem('token') !== null;
    }

    getSignedinUser() {
        return sessionStorage.getItem('user') as string;
    }

    getToken() {
        let token = sessionStorage.getItem('token') as string;
        return token;
    }
}
