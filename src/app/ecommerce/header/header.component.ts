import {AfterViewInit, ChangeDetectorRef, Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {ProductService} from "../../demo/service/product.service";
import {Basket} from "../model/basket";
import {Urun} from "../model/urun";
import {HttpErrorResponse} from "@angular/common/http";
import {UserComponent} from "../user/user.component";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {CartService} from "../../demo/service/cart.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [
        MenubarModule,
        ButtonModule
    ],
    standalone: true
})
export class HeaderComponent implements OnInit{

    items: any = [];
    cardItem?: number ;

    constructor(private cartService:CartService) {
    }

    ngOnInit(): void {
        this.cartService.getCartObservable().subscribe(cartSummary => {
            this.cardItem=cartSummary.count;
        })
    }

}
