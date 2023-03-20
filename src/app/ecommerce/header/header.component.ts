import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../demo/service/product.service";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {CartService} from "../../demo/service/cart.service";
import {AvatarModule} from "primeng/avatar";
import {User} from "../model/user";
import {UpperCasePipe} from "@angular/common";
import {BadgeModule} from "primeng/badge";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [
        MenubarModule,
        ButtonModule,
        AvatarModule,
        UpperCasePipe,
        BadgeModule,
        FormsModule
    ],
    standalone: true
})
export class HeaderComponent implements OnInit {

    items: any = [];
    cardItem?: any;

    username!: string;

    user!: User;

    constructor(private cartService: CartService, private productService: ProductService, private router: Router) {
    }

    ngOnInit(): void {
        this.cartService.getCartObservable().subscribe(cartSummary => {
            this.cardItem = cartSummary.count;
        })
        // @ts-ignore
        let userId = Number(JSON.parse(localStorage.getItem('userType')));

        this.productService.getUserById(userId).subscribe(v => {
            this.user = v;
            this.username = this.user?.username!;
        });
    }

    GoToLogin() {
        this.router.navigate(['login']);
    }

    redirectCard() {
        this.router.navigate(['/card']);
    }

    GoToProducts() {
        this.router.navigate(['/user']);
    }
}
