import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {ProductService} from "../../demo/service/product.service";
import {Basket} from "../model/basket";
import {Urun} from "../model/urun";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductDetailComponent} from "../productdetails/productdetail.component";
import {UserComponent} from "../user/user.component";
import {StockComponent} from "../stock/stock.component";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit{

    basketItems! : Basket[];
    selectedProducts!: Basket[];

    amount : number = 1;

    changeStock!: boolean;
    outofStock: string="OutOfStock";

    constructor(private auth: AuthService,private productService:ProductService) {
    }


    ngOnInit(): void {
        // @ts-ignore
        let userId = Number(JSON.parse(localStorage.getItem('userType')));
        this.productService.getBasketByUserId(userId).subscribe((resp : Basket[]) => {this.basketItems = resp
            console.log(this.basketItems)
            this.loadCart();
        })
        // this.productService.getBasketData().subscribe((resp : Basket[]) => {this.basketItems = resp
        //     console.log(this.basketItems)
        //     this.loadCart();
        //
        // })

    }

    incQnt({prodId, qnt}: { prodId: any, qnt: any }) {
        this.basketItems.forEach(v=>{
        })
        for (let i = 0; i < this.basketItems.length; i++) {
            // @ts-ignore
            if (this.basketItems[i].product.id === prodId) {
                // @ts-ignore
                if (qnt < this.basketItems[i].product.stok ) {
                        // @ts-ignore
                        this.basketItems[i].quantity += this.amount;
                    // @ts-ignore
                    this.productService.setQuantity(this.basketItems[i].id,this.basketItems[i].quantity).subscribe(
                        (response : void) => {
                            console.log(response)
                        },
                        (error:HttpErrorResponse) => {
                            alert(error.message)
                        }
                    );
                    this.loadCart();
                    }
            }
        }
        console.log(this.selectedProducts )
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
                    this.productService.setQuantity(this.basketItems[i].id,this.basketItems[i].quantity).subscribe(
                        (response : void) => {
                            console.log(response)
                        },
                        (error:HttpErrorResponse) => {
                            alert(error.message)
                        }
                    );
                }
            }
            }
        }


    total: number = 0;
    loadCart() {
        this.total=0;
        if (this.basketItems) {
            this.basketItems.forEach(v => {
               this.total +=( v.quantity! * v.product?.price!);
                console.log(this.total)
            })
        }
    }

    getBasketAll() : void {
        this.productService.getBasketData().subscribe((resp : Basket[]) => this.basketItems = resp)
    }

     removeall() {
         this.productService.deleteAllBasket(this.basketItems).subscribe(
             (response : Basket[]) => {
                 console.log(response)
                 this.getBasketAll();
                 this.total=0;
             },
             (error:HttpErrorResponse) => {
                 alert(error.message)
             }

         )
     }

    singleDelete(id: number) {
       this.productService.deleteBasket(id).subscribe(
           (resp : void) => {
               console.log(resp)
           },
           (error:HttpErrorResponse) => {
               alert(error.message)}
       )
    }

    buy(number: number) {
        this.productService.getByIdBasket(number).subscribe(value => {
            console.log(value)

            // @ts-ignore
            if(value.quantity >= value.product.stok){
                // @ts-ignore
                value.product.stok = 0;
                // @ts-ignore
                this.productService.updateData(value.product).subscribe(value=>{
                    console.log(value)
                })

            }
            else {
                // @ts-ignore
                value.product.stok = value.product.stok - value.quantity;
                // @ts-ignore
                this.productService.updateData(value.product).subscribe(value=>{
                    console.log(value)
                })
            }

        })
    }

}
