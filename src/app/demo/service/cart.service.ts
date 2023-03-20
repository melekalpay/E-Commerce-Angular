import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Cartsummary} from "../../ecommerce/model/cartsummary";
import {Basket} from "../../ecommerce/model/basket";
import {ProductService} from "./product.service";

@Injectable()
export class CartService {

    basketItems!: Basket[] ;
    leng !: number;
    private cartSubject =new BehaviorSubject<Cartsummary>({
        count: this.leng
    });

    private cartObservable = this.cartSubject.asObservable();

    public getCartObservable():Observable<Cartsummary> {
        return this.cartObservable;
    }

    public setCart(cartSummary : Cartsummary) {
        return this.cartSubject.next(cartSummary);
    }


    constructor(private http: HttpClient,private productService : ProductService) {
        // @ts-ignore
        let userId = Number(JSON.parse(localStorage.getItem('userType')));

        this.productService.getBasketByUserId(userId).subscribe((resp: Basket[]) => {
            this.basketItems = resp
            this.leng=this.basketItems.length
            console.log("gfjkdlfj",this.leng)
            console.log(this.basketItems)

        })
    }


}
