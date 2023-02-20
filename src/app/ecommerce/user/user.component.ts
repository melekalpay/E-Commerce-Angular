import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Product} from "../../demo/api/product";
import {ProductService} from "../../demo/service/product.service";
import {Urun} from "../model/urun";
import {J} from "@angular/cdk/keycodes";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {


    products!: Urun[];

    items: any = [];

    cardItem: number = 0;

    urun!: Urun;

    cardItemFunc() {
        if (localStorage.getItem('localCard') != null) {
            // @ts-ignore
            var cardCount = JSON.parse(localStorage.getItem('localCard'))
            this.cardItem = cardCount.length;
        }
    }

    cartNumber: number = 0;

    cartNumberFunc() {
        // @ts-ignore
        var cartValue = JSON.parse(localStorage.getItem('localCard'))
        this.cartNumber = cartValue.length
        this.authservice.cartSubject.next(this.cartNumber)
    }

    constructor(private productService: ProductService, private router: Router, private authservice: AuthService) {
        this.authservice.cartSubject.subscribe((data) => {
            this.cardItem = data;
        })
    }

    ngOnInit() {

        this.productService.getMysqlData().subscribe((resp : Urun[]) => this.products = resp)
        console.log(this.products)
        // @ts-ignore
       // this.products= JSON.parse(localStorage.getItem('datas')) //local storagedan çekmek için
        this.cardItemFunc();

    }

    redirectCard() {
        this.router.navigate(['/card']);
    }

    inc(product: Urun) {
        // @ts-ignore
        if (product.amount < product.stok) {
            // @ts-ignore
            product.amount += 1
            // @ts-ignore
        } else {
            alert("For this product store amount :" + product.stok)
        }
    }

    dec(product: Urun) {
        // @ts-ignore
        if (product.amount > 1) {
            // @ts-ignore
            product.amount -= 1
            // @ts-ignore
        }
    }

    itemsCard: any = [];
    productDialog!: boolean;

    showDetail(product: Urun) {
        this.urun = {...product};
        this.productDialog = true;
    }

    addToCard(category: Urun) {
        let cartData = localStorage.getItem('localCard')
        if (cartData == null) {
            let storeData: any = [];
            storeData.push(category)
            localStorage.setItem('localCard', JSON.stringify(storeData))
        } else {
            var idCard = category.id;
            let index: number = -1;
            // @ts-ignore
            this.itemsCard = JSON.parse(localStorage.getItem('localCard'))
            for (let i = 0; i < this.itemsCard.length; i++) {
                // @ts-ignore
                if (parseInt(<string>idCard) === parseInt(this.itemsCard[i].id)) {
                    this.itemsCard[i].amount = category.amount
                    index = i
                    break;
                }
            }
            if (index == -1) {
                this.itemsCard.push(category)
                localStorage.setItem('localCard', JSON.stringify(this.itemsCard))
            } else {
                localStorage.setItem('localCard', JSON.stringify(this.itemsCard))
            }
        }

        this.cartNumberFunc();
    }

}
