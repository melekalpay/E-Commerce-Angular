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
        return this.http.get<Urun[]>(`${this.apiUrl}product/all`)
    }

    saveData(urun : Urun) : Observable<Object>{
        return this.http.post<Urun>(`${this.apiUrl}product/save`, urun);
    }
    updateData(urun : Urun) : Observable<Object>{
        return this.http.put<Urun>(`${this.apiUrl}product/update`, urun);
    }

    deleteData(id : number) : Observable<void>{
        return  this.http.delete<void>(`${this.apiUrl}product/delete/${id}`);
    }
    findByIdData(id : number) : Observable<Object>{
        return  this.http.get<Urun>(`${this.apiUrl}product/findById/${id}`);
    }

    getBasketData(): Observable<Basket[]>{
        return this.http.get<Basket[]>(`${this.apiUrl}basket/all`)
    }
    saveBasket(basket : Basket,quantity:number) : Observable<Object>{
        return this.http.post<Basket>(`${this.apiUrl}basket/save/${quantity}/`, basket);
    }

    deleteBasket(id : number) : Observable<void>{
        return  this.http.delete<void>(`${this.apiUrl}basket/delete/${id}`);
    }

    deleteAllBasket(basket : Basket[]) : Observable<Basket[]>{
        return  this.http.post<Basket[]>(`${this.apiUrl}basket/delete/all`,basket);
    }

    setQuantity(id: number , amount : number) :Observable<void>{
        return  this.http.post<void>(`${this.apiUrl}basket/setQuantity/${amount}`,id);
    }

    getByIdBasket(id:number):Observable<Object>{
        return  this.http.get<Basket>(`${this.apiUrl}basket/findById/${id}`);
    }

    getAllComments():Observable<Comment[]>{
        return  this.http.get<Comment[]>(`${this.apiUrl}comment/all`);
    }

    saveUser(username: string , password : string) :Observable<Object>{
        return  this.http.post<User>(`${this.apiUrl}user/save/${username}`,password);
    }

    getAllUsers():Observable<User[]>{
        return this.http.get<User[]>(`${this.apiUrl}user/all`);
    }

    getBasketByUserName(username:string):Observable<Object>{
        return  this.http.get<Basket>(`${this.apiUrl}basket/findByUserName/${username}`);
    }



}
