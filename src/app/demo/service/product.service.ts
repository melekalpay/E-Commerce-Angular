import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import {Urun} from "../../ecommerce/model/urun";
import {environment} from "../../../environments/environment";
import {log10} from "chart.js/helpers";
import {Observable, tap, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

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

    deleteData(id : number) : Observable<void>{
        return  this.http.delete<void>(`${this.apiUrl}product/delete/${id}`);
    }

}
