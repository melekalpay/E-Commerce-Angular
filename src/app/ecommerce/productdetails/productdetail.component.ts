import {AfterViewInit, ChangeDetectorRef, Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {ProductService} from "../../demo/service/product.service";
import {Basket} from "../model/basket";
import {Urun} from "../model/urun";
import {HttpErrorResponse} from "@angular/common/http";
import {UserComponent} from "../user/user.component";
import {CartService} from "../../demo/service/cart.service";
import {count} from "rxjs";
import {Cartsummary} from "../model/cartsummary";

@Component({
    selector: 'app-productdetail',
    templateUrl: './productdetail.component.html',
    providers: [CartService]
})
export class ProductDetailComponent implements OnInit {



    urun!: Urun;
    items: any = [];
    cardItem: number = 0;
    basketItems!: Basket[];
    display: boolean = false;

    amount : number =1;

    cart! : Cartsummary;


    showDialog() {
        this.display = true;
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => this.getByIdProduct(params['id']));
        console.log(this.urun)

        this.productService.getBasketData().subscribe((resp: Basket[]) => {
            this.basketItems = resp
            console.log(this.basketItems)

        })

        this.cartService.getCartObservable().subscribe(v=>{
            // @ts-ignore
            this.cardItem = v.count;
        })
    }


    constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router,private cartService:CartService) {
        this.productService.getBasketData().subscribe((resp: Basket[]) => {
            this.basketItems = resp
        })
    }

    getByIdProduct(id: number) {
        this.productService.findByIdData(id).subscribe((data: Urun) => this.urun = data);
        console.log(this.urun)
    }

    addToSepet(category: Urun) {
        let count ={
            count : this.cardItem + 1
        }
        this.cartService.setCart(count);
        if (this.basketItems.length ==0){
            this.productService.saveBasket(category,this.amount).subscribe((data: any) => {
                console.log(data)}
            )
        }
        for(let i =0;i<this.basketItems.length;i++){
            // @ts-ignore
            if(category.id == this.basketItems[i].product.id){
                // @ts-ignore
                this.basketItems[i].quantity+=this.amount;

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
            else {
                this.productService.saveBasket(category,this.amount).subscribe((data: any) => {
                    console.log(data)}
                )
            }
        }
        console.log(this.amount)}


    redirectCard() {
        this.router.navigate(['/card']);
    }

    incQnt(urun : Urun) {
        console.log("la",urun)
        if (this.amount < this.urun?.stok!) {
            // @ts-ignore
           this.amount += 1;
        }

    }

    decQnt(urun : Urun) {
        if (this.amount > 1) {
            // @ts-ignore
            this.amount -= 1;
        }
    }
}
