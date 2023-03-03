import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Cartsummary} from "../../ecommerce/model/cartsummary";

@Injectable()
export class CartService {
    private cartSubject =new BehaviorSubject<Cartsummary>({
        count : 0
    });

    private cartObservable = this.cartSubject.asObservable();

    public getCartObservable():Observable<Cartsummary> {
        return this.cartObservable;
    }

    public setCart(cartSummary : Cartsummary) {
        return this.cartSubject.next(cartSummary);
    }


    constructor(private http: HttpClient) { }


}
