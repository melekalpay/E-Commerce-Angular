import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Product} from "../../demo/api/product";
import {ProductService} from "../../demo/service/product.service";
import {Urun} from "../model/urun";
import {J} from "@angular/cdk/keycodes";
import {AuthService} from "../../auth/auth.service";
import {Basket} from "../model/basket";
import {log10} from "chart.js/helpers";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {


    products!: Urun[];

    items: any = [];

    cardItem: number = 0;

    urun!: Urun;

    basketItems!: Basket[];


    constructor(private productService: ProductService, private router: Router) {
        this.productService.getBasketData().subscribe((resp : Basket[]) => {this.basketItems = resp
            this.cardItem =this.basketItems.length;})
    }


    ngOnInit() {
        this.productService.getMysqlData().subscribe((resp : Urun[]) => this.products = resp)


    }

    redirectCard() {
        this.router.navigate(['/card']);
    }


    productDialog!: boolean;

    showDetail(product: Urun) {
        this.urun = {...product};
        this.productDialog = true;
    }


    addToSepet(category: Urun){
        this.productService.saveBasket(category).subscribe((data:  any) => {
            console.log(data)
        })

}

}
