import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../demo/service/product.service";
import {Basket} from "../model/basket";
import {Urun} from "../model/urun";
import {Comment} from "../model/comment";
import {HttpErrorResponse} from "@angular/common/http";
import {CartService} from "../../demo/service/cart.service";
import {Cartsummary} from "../model/cartsummary";
import {User} from "../model/user";

@Component({
    selector: 'app-productdetail',
    templateUrl: './productdetail.component.html',
    styleUrls: ['productdetail.component.css'],
    providers: [CartService]
})
export class ProductDetailComponent implements OnInit {


    urun!: Urun;
    items: any = [];
    cardItem: number = 0;
    basketItems!: Basket[];
    display: boolean = false;

    amount: number = 1;

    comment: Comment = {};

    cart!: Cartsummary;
    list: any[] = [];
    list1: any[] = [];

    user!: User;

    text!: string;


    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.getByIdProduct(params['id']);
            this.recursive(params['id']);
        });
        console.log(this.urun)


        this.cartService.getCartObservable().subscribe(v => {
            // @ts-ignore
            this.cardItem = v.count;
        })

        // @ts-ignore
        let userId = Number(JSON.parse(localStorage.getItem('userType')));

        this.productService.getUserById(userId).subscribe(v => {
            this.user = v;
        });
        this.productService.getBasketByUserId(userId).subscribe((resp: Basket[]) => {
            this.basketItems = resp
            let count = {
                count: this.basketItems.length
            }
            this.cartService.setCart(count);
            console.log(this.basketItems)

        })

    }

    recursive(id: number) {
        this.productService.getAllCommentByProductId(id).subscribe(value => {
            this.list = value;
            this.list1 = recursive(this.list);

        })
        let recursive = (list: any, id = 0) => {
            let array: any[] = [];
            this.list.forEach((element: any) => {
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

    constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private cartService: CartService) {
        this.getAllBasket();

    }

    getAllBasket() {
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

    getByIdProduct(id: number) {
        this.productService.findByIdData(id).subscribe((data: Urun) => this.urun = data);
        console.log(this.urun)

    }

    addToSepet(category: Urun) {

        // @ts-ignore
        let userId = Number(JSON.parse(localStorage.getItem('userType')));

        if (category.stok! < 1) {
            alert("Stokta kalmamış.")
            this.router.navigate(['user']);
            return;
        }
        if (this.basketItems.length == 0) {
            this.productService.saveBasket(category, this.amount, userId).subscribe(
                (data: any) => {
                    console.log(data)
                },
                (err: any) => {
                },
                () => {
                    this.getAllBasket();
                }
            )
        }
        let varMiYokmu = 0;
        let control = 0;
        for (let i = 0; i < this.basketItems.length; i++) {
            if (category.id === this.basketItems[i]?.product?.id) {
                varMiYokmu++;
            }
        }

        for (let i = 0; i < this.basketItems.length; i++) {
            if (this.basketItems[i]?.quantity! < category?.stok! && (this.basketItems[i]?.quantity! + this.amount) <= category.stok!) {
                // @ts-ignore
                if (category.id === this.basketItems[i].product.id) {
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
                }
            }
            if (varMiYokmu == 0 && control == 0) {
                this.productService.saveBasket(category, this.amount, userId).subscribe(
                    (data: any) => {
                        console.log(data)
                    },
                    (err: any) => {
                    },
                    () => {
                        this.getAllBasket();
                    })
                control++;
            }

        }
        console.log(this.amount)

    }

    incQnt(urun: Urun) {
        if (this.amount < this.urun?.stok!) {
            // @ts-ignore
            this.amount += 1;
        }
    }

    decQnt(urun: Urun) {
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
            v => {
            },
            error => {
            },
            (complete: void) => {
                this.recursive(this.urun?.id!)
            })

    }
}
