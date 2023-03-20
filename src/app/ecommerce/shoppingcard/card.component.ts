import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {ProductService} from "../../demo/service/product.service";
import {Basket} from "../model/basket";
import {HttpErrorResponse} from "@angular/common/http";
import {CartService} from "../../demo/service/cart.service";
import {window} from "rxjs";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {

    basketItems!: Basket[];
    selectedProducts!: Basket[];

    amount: number = 1;


    constructor(private auth: AuthService, private productService: ProductService, private router: Router, private cartService: CartService) {
    }


    ngOnInit(): void {
        // @ts-ignore
        let userId = Number(JSON.parse(localStorage.getItem('userType')));
        this.productService.getBasketByUserId(userId).subscribe((resp: Basket[]) => {
            this.basketItems = resp
            console.log(this.basketItems)
            let count = {
                count: this.basketItems.length
            }
            this.cartService.setCart(count);
            this.loadCart();
        })

    }

    incQnt({prodId, qnt}: { prodId: any, qnt: any }) {
        this.basketItems.forEach(v => {
        })
        for (let i = 0; i < this.basketItems.length; i++) {
            // @ts-ignore
            if (this.basketItems[i].product.id === prodId) {
                // @ts-ignore
                if (qnt < this.basketItems[i].product.stok) {
                    // @ts-ignore
                    this.basketItems[i].quantity += this.amount;
                    // @ts-ignore
                    this.productService.setQuantity(this.basketItems[i].id, this.basketItems[i].quantity).subscribe(
                        (response: void) => {
                            console.log(response)
                        },
                        (error: HttpErrorResponse) => {
                            alert(error.message)
                        }
                    );
                    this.loadCart();
                }
            }
        }
        console.log(this.selectedProducts)
    }

    decQnt({prodId, qnt}: { prodId: any, qnt: any }) {
        for (let i = 0; i < this.basketItems.length; i++) {
            // @ts-ignore
            if (this.basketItems[i].product.id === prodId) {
                if (qnt != 1) {
                    if (this.basketItems[i].quantity! >= 1) {
                        this.total -= this.basketItems[i].product?.price!;
                        console.log(this.total)
                    } else {
                        this.total = this.basketItems[i].product?.price!;
                    }
                    // @ts-ignore
                    this.basketItems[i].quantity -= this.amount;
                    // @ts-ignore
                    this.productService.setQuantity(this.basketItems[i].id, this.basketItems[i].quantity).subscribe(
                        (response: void) => {
                            console.log(response)
                        },
                        (error: HttpErrorResponse) => {
                            alert(error.message)
                        }
                    );
                }
            }
        }
    }


    total: number = 0;

    loadCart() {
        this.total = 0;
        if (this.basketItems) {
            this.basketItems.forEach(v => {
                this.total += (v.quantity! * v.product?.price!);
                console.log("totalll", this.total)
            })
        }
    }

    getBasketAll(): void {
        // @ts-ignore
        let userId = Number(JSON.parse(localStorage.getItem('userType')));
        this.productService.getBasketByUserId(userId).subscribe((resp: Basket[]) => {
            this.basketItems = resp
            let count = {
                count: this.basketItems.length
            }
            console.log("fdjksl", count.count)
            this.cartService.setCart(count);
            console.log(this.basketItems)
        })
    }

    removeall() {

        this.productService.deleteAllBasket(this.basketItems).subscribe(
            (response: void) => {
                console.log(response)
                this.getBasketAll();
                let count = {
                    count: this.basketItems.length
                }
                this.cartService.setCart(count);
                this.total = 0;
            },
            (error: HttpErrorResponse) => {
                alert(error.message)
            }
        )
    }

    singleDelete(id: number) {
        this.productService.deleteBasket(id).subscribe(
            (resp: void) => {
                this.getBasketAll();
                console.log(resp)
                let count = {
                    count: this.basketItems.length
                }
                this.cartService.setCart(count);
            },
            (error: HttpErrorResponse) => {
                alert(error.message)
            },
            () => {
                location.reload();
            }
        )
    }

    buy(number: number) {
        this.productService.getByIdBasket(number).subscribe(value => {
            console.log(value)
            // @ts-ignore
            if (value.product.stok > 0) {
                // @ts-ignore
                if (value.quantity >= value.product.stok) {
                    // @ts-ignore
                    value.product.stok = 0;
                    // @ts-ignore
                    this.productService.updateData(value.product).subscribe(value => {
                        console.log(value)
                    })
                    this.singleDelete(number);
                    alert("Satın Alma İşlemi Başarılı.")
                    this.router.navigate(['user']);

                } else {
                    // @ts-ignore
                    value.product.stok = value.product.stok - value.quantity;
                    // @ts-ignore
                    this.productService.updateData(value.product).subscribe(value => {
                            console.log(value)
                        }
                    )
                    this.singleDelete(number);
                    alert("Satın Alma İşlemi Başarılı.")
                    this.router.navigate(['user']);
                }
            } else {
                alert("Ürün stokta kalmamış.")
                this.singleDelete(number);
                this.router.navigate(['user'])
            }

        })
    }


    buyAll() {
        let count = 0;
        for (let i = 0; i < this.basketItems.length; i++) {
            if (this.basketItems[i]?.product?.stok! > 0) {
                if (this.basketItems[i]?.quantity! >= this.basketItems[i]?.product?.stok!) {
                    // @ts-ignore
                    this.basketItems[i].product.stok = 0;
                    this.productService.updateData(this.basketItems[i]?.product!).subscribe(value => {
                        console.log(value)
                    })
                } else {
                    // @ts-ignore
                    this.basketItems[i].product.stok = this.basketItems[i].product.stok - this.basketItems[i].quantity;
                    // @ts-ignore
                    this.productService.updateData(this.basketItems[i].product).subscribe(value => {
                            console.log(value)
                        }
                    )
                }
            } else {
                alert(this.basketItems[i]?.product?.name! + " stokta kalmamıştır")
                this.singleDelete(this.basketItems[i]?.id!);
                this.total = this.total - (this.basketItems[i]?.product?.price! * this.basketItems[i]?.quantity!);
                count++;
                alert("Satın Alma Başarısız.")
                return;
            }
        }
        if (count == 0 && this.basketItems.length) {
            this.removeall();
            alert("Satın Alma İşlemi Başarılı.")
            this.router.navigate(['user']);
        }
    }
}
