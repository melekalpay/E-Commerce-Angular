import {AfterViewInit, ChangeDetectorRef, Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {ProductService} from "../../demo/service/product.service";
import {Basket} from "../model/basket";
import {Urun} from "../model/urun";
import {Comment} from "../model/comment";
import {HttpErrorResponse} from "@angular/common/http";
import {UserComponent} from "../user/user.component";
import {CartService} from "../../demo/service/cart.service";
import {count} from "rxjs";
import {Cartsummary} from "../model/cartsummary";
import {User} from "../model/user";

@Component({
    selector: 'app-productdetail',
    templateUrl: './productdetail.component.html',
    styleUrls:['productdetail.component.css'],
    providers: [CartService]
})
export class ProductDetailComponent implements OnInit {



    urun!: Urun;
    items: any = [];
    cardItem: number = 0;
    basketItems!: Basket[];
    display: boolean = false;

    amount : number =1;

    comment : Comment={};

    cart! : Cartsummary;
    list: any[]=[];
    list1:any[]=[];

    user!: User;

    text! : string;


    ngOnInit(): void {
        this.route.params.subscribe(params => {this.getByIdProduct(params['id']);
            this.recursive(params['id']);});
        console.log(this.urun)

        this.productService.getBasketData().subscribe((resp: Basket[]) => {
            this.basketItems = resp
            console.log(this.basketItems)

        })

        this.cartService.getCartObservable().subscribe(v=>{
            // @ts-ignore
            this.cardItem = v.count;
        })



        // @ts-ignore
        let userId = Number(JSON.parse(localStorage.getItem('userType')));

        this.productService.getUserById(userId).subscribe(v=>{
            this.user = v;
        });


    }

    recursive(id :number){
        console.log("hahahsjsks",id)

        this.productService.getAllCommentByProductId(id).subscribe(value => {
            this.list = value;
            this.list1=recursive(this.list);
            console.log("laha",this.list1)

        })
        let recursive = (list : any, id = 0) => {
            let array : any[]= [];
            this.list.forEach((element: any)=> {
                if (element.parent === id) {
                    let children = recursive(this.list, element.id);
                    if (children.length) {
                        element.children = children;
                    } else {
                        element.children = [];
                    }
                    array.push(element);
                }
            })
            return array;
        }

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
        // @ts-ignore
        let userId = Number(JSON.parse(localStorage.getItem('userType')));
        this.cartService.setCart(count);
        if (this.basketItems.length ==0){
            this.productService.saveBasket(category,this.amount,userId).subscribe((data: any) => {
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
                this.productService.saveBasket(category,this.amount,userId).subscribe((data: any) => {
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

    saveComment() {
        this.comment.comment = this.text;
        this.comment.product = this.urun;
        this.comment.parent = 0;
        this.comment.user = this.user;
        this.productService.saveComment(this.comment).subscribe(
            v=>{},
            error => {},
            (complete:void) =>{this.recursive(this.urun?.id!)})

    }
}
