import {AfterViewInit, ChangeDetectorRef, Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {ProductService} from "../../demo/service/product.service";
import {Basket} from "../model/basket";
import {Urun} from "../model/urun";
import {HttpErrorResponse} from "@angular/common/http";
import {UserComponent} from "../user/user.component";

@Component({
    selector: 'app-productdetail',
    templateUrl: './productdetail.component.html'
})
export class ProductDetailComponent implements OnInit {

    urun!: Urun;
    items: any = [];
    cardItem: number = 0;
    basketItems!: Basket[];
    display: boolean = false;

    amount : number =1;

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
    }


    constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
        this.productService.getBasketData().subscribe((resp: Basket[]) => {
            this.basketItems = resp
            this.cardItem = this.basketItems.length;
        })
    }

    getByIdProduct(id: number) {
        this.productService.findByIdData(id).subscribe((data: Urun) => this.urun = data);
        console.log(this.urun)
    }

    addToSepet(category: Urun) {

        if (this.basketItems.length==0){
            this.productService.saveBasket(category).subscribe((data: any) => {
                console.log(data)
        })}
        for(let i=0;i<this.basketItems.length;i++){
            // @ts-ignore
            if(this.basketItems[i].product.id === category.id){
                // @ts-ignore
                this.basketItems[i].quantity +=1;
            }
            else{
                this.productService.saveBasket(category).subscribe((data: any) => {
                    console.log(data)
                })
            }}}



        // if (this.basketItems.length===0){
        //     this.productService.saveBasket(category).subscribe((data: any) => {
        //         console.log(data)
        //         return;
        //     })}
        // for (let i = 0; i < this.basketItems.length; i++) {
        //     // @ts-ignore
        //     if (this.basketItems[i].product.id === category.id) {
        //
        //         console.log("eşitler")
        //         // @ts-ignore
        //         if (this.amount != category.stok )
        //         {
        //             // @ts-ignore
        //             this.amount +=1;
        //             console.log("amount",this.amount)
        //             // @ts-ignore
        //             return;
        //         }
        // }
        //         this.productService.saveBasket(category).subscribe((data: any) => {
        //             console.log(data)
        //         })
        // }



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
