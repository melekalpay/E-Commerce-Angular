import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import {Urun} from "../../ecommerce/model/urun";
import {environment} from "../../../environments/environment";
import {log10} from "chart.js/helpers";
import {Observable, tap, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Basket} from "../../ecommerce/model/basket";
import {User} from "../../ecommerce/model/user";
import {Comment} from "../../ecommerce/model/comment";

@Injectable()
export class ProductService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getUrun() {
        return this.http.get<any>('assets/demo/data/urun.json')
            .toPromise()
            .then(res => res.data as Urun[])
            .then(data => data);
    }


    getMysqlData(): Observable<Urun[]>{

        return this.http.get<Urun[]>(`${this.apiUrl}product/all`,this.authHttpHeader())
    }

    saveData(urun : Urun) : Observable<Object>{
        return this.http.post<Urun>(`${this.apiUrl}product/save`, urun,this.authHttpHeader());
    }
    updateData(urun : Urun) : Observable<Object>{
        return this.http.put<Urun>(`${this.apiUrl}product/update`, urun,this.authHttpHeader());
    }

    deleteData(id : number) : Observable<void>{
        return  this.http.delete<void>(`${this.apiUrl}product/delete/${id}`,this.authHttpHeader());
    }
    findByIdData(id : number) : Observable<Object>{
        return  this.http.get<Urun>(`${this.apiUrl}product/findById/${id}`,this.authHttpHeader());
    }

    getBasketData(): Observable<Basket[]>{
        return this.http.get<Basket[]>(`${this.apiUrl}basket/all`)
    }
    saveBasket(basket : Basket,quantity:number,id:number) : Observable<Object>{
        return this.http.post<Basket>(`${this.apiUrl}basket/save/${quantity}/${id}`, basket,this.authHttpHeader());
    }

    deleteBasket(id : number) : Observable<void>{
        return  this.http.delete<void>(`${this.apiUrl}basket/delete/${id}`,this.authHttpHeader());
    }

    deleteAllBasket(basket : Basket[]) : Observable<void>{
        return  this.http.post<void>(`${this.apiUrl}basket/delete/all`,basket,this.authHttpHeader());
    }

    setQuantity(id: number , amount : number) :Observable<void>{
        return  this.http.post<void>(`${this.apiUrl}basket/setQuantity/${amount}`,id,this.authHttpHeader());
    }

    getByIdBasket(id:number):Observable<Object>{
        return  this.http.get<Basket>(`${this.apiUrl}basket/findById/${id}`,this.authHttpHeader());
    }

    getAllComments():Observable<Comment[]>{
        return  this.http.get<Comment[]>(`${this.apiUrl}comment/all`);
    }

    saveUser(username: string , password : string) :Observable<Object>{
        return  this.http.post<User>(`${this.apiUrl}user/save/${username}`,password);
    }

    getAllUsers():Observable<User[]>{
        return this.http.get<User[]>(`${this.apiUrl}user/all`,this.authHttpHeader());
    }

    getUserById(id:number):Observable<Object>{
        return this.http.get<User>(`${this.apiUrl}user/findById/${id}`,this.authHttpHeader());
    }

    saveComment(comment : Comment) : Observable<Object>{
        return this.http.post<Comment>(`${this.apiUrl}comment/save`, comment,this.authHttpHeader());
    }

    getAllCommentByProductId(id:number) : Observable<Comment[]>{
        return this.http.get<Comment[]>(`${this.apiUrl}comment/findByProductId/${id}`,this.authHttpHeader());
    }

    getBasketByUserId(id:number):Observable<Basket[]>{
        return  this.http.get<Basket[]>(`${this.apiUrl}basket/findByUserId/${id}`,this.authHttpHeader());
    }

    generateToken(request:any){
        return this.http.post(`${this.apiUrl}auth/register`,request,{responseType: 'text' as 'json'});
    }
    generateTokenLogin(request:any){
        return this.http.post(`${this.apiUrl}auth/login`,request,{responseType: 'text' as 'json'});
    }

    getToken(){
        let token = sessionStorage.getItem('token') as string;
        return token;
    }

    authHttpHeader(){

        var headers_object = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken() })

        const httpOptions = {
            headers: headers_object
        };
        return httpOptions;

    }


}
