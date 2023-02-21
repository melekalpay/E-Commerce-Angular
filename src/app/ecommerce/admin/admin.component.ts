import {AfterContentChecked, Component, DoCheck, OnInit} from '@angular/core';
import {ProductService} from "../../demo/service/product.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Urun} from "../model/urun";
import {Router} from "@angular/router";
import {Product} from "../../demo/api/product";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    providers: [MessageService, ConfirmationService]
})
export class AdminComponent implements OnInit{
    product!: Urun;
    submitted!: boolean;
    productDialog!: boolean;
    products!: Urun[];


    constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router) {

    }

    ngOnInit() {
        this.productService.getMysqlData().subscribe((resp : Urun[]) => this.products = resp)

    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    public saveProducts(): void {
        this.submitted = true;
        this.productService.saveData(this.product).subscribe((data:  any) => {
            console.log(data)
        });
        this.productDialog = false;
    }

    redirectUser() {
        this.router.navigate(["/user"])
    }

    editProduct(product: Urun) {
        this.product = {...product};
        this.productDialog = true;
    }

    getProducts() : void {
        this.productService.getMysqlData().subscribe((resp : Urun[]) => this.products = resp)
    }

    delete(id: number) {
        this.productService.deleteData(id).subscribe(
            (response : void) => {
                console.log(response)
                this.getProducts();
            },
            (error:HttpErrorResponse) => {
                alert(error.message)
            }
        )
    }
}
