import {AfterContentChecked, Component, DoCheck, OnInit} from '@angular/core';
import {ProductService} from "../../demo/service/product.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Urun} from "../model/urun";
import {Router} from "@angular/router";

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

        this.productService.getUrun().then(data => {
            this.products = data;
        });
        console.log("init")
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

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.product.id = this.createId();
                this.products.push(this.product);
                localStorage.setItem('datas', JSON.stringify(this.products));
                // @ts-ignore
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
            }

            this.products = [...this.products];
            this.product = {};
            this.productDialog = false;

        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }
        return index;

    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    redirectUser() {
        this.router.navigate(["/user"])
    }

    // ngDoCheck(): void {
    //         // @ts-ignore
    //         this.products= JSON.parse(localStorage.getItem('datas'))
    //     console.log("docheck")
    //
    // }
    //Admin sayfasında kaydedilen ürünün görülmesi için

}
