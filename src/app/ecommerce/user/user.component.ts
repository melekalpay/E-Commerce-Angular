import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../demo/service/product.service";
import {Urun} from "../model/urun";
import {Basket} from "../model/basket";
import {CartService} from "../../demo/service/cart.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, AfterViewInit {

    sortOrder!: number;

    sortField!: string;

    products!: Urun[];


    items: any = [];

    basketItems!: Basket[];


    constructor(private productService: ProductService, private router: Router, private cd: ChangeDetectorRef, private cartService: CartService) {
    }


    ngOnInit() {
        this.productService.getMysqlData().subscribe((resp: Urun[]) => this.products = resp)
        // @ts-ignore
        let userId = Number(JSON.parse(localStorage.getItem('userType')));
        this.productService.getBasketByUserId(userId).subscribe((resp: Basket[]) => {
            this.basketItems = resp
            console.log(this.basketItems)
            let count = {
                count: this.basketItems.length
            }
            this.cartService.setCart(count);
        })

    }


    GoToProduct(product: any) {
        this.router.navigate(['product', product.id]);
    }

    ngAfterViewInit(): void {
    }
}
