import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    DoCheck,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Product} from "../../demo/api/product";
import {ProductService} from "../../demo/service/product.service";
import {Urun} from "../model/urun";
import {J} from "@angular/cdk/keycodes";
import {AuthService} from "../../auth/auth.service";
import {Basket} from "../model/basket";
import {log10} from "chart.js/helpers";
import {SelectItem} from "primeng/api";
import {CardComponent} from "../shoppingcard/card.component";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit,AfterViewInit {

    sortOrder!: number;

    sortField!: string;

    products!: Urun[];


    items: any = [];




    constructor(private productService: ProductService, private router: Router,private cd:ChangeDetectorRef) {
    }



    ngOnInit() {
        this.productService.getMysqlData().subscribe((resp : Urun[]) => this.products = resp)


    }


    GoToProduct(product : any) {
        this.router.navigate(['product',product.id]);
    }

    ngAfterViewInit(): void {
    }
}
