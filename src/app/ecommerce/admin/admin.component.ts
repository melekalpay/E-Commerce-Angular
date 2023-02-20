import {AfterContentChecked, Component, DoCheck, OnInit} from '@angular/core';
import {ProductService} from "../../demo/service/product.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Urun} from "../model/urun";
import {Router} from "@angular/router";
import {Product} from "../../demo/api/product";

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
        // this.productService.getUrun().then(data => {
        //     this.products = data;})
        // @ts-ignore
       // this.products= JSON.parse(localStorage.getItem('datas'));
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

    deleteProduct(product: Urun) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => val.id !== product.id);
                this.product = {} as Urun;
                localStorage.setItem('datas', JSON.stringify(this.products))
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
            }
        });
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

    // ngDoCheck(): void {
    //         // @ts-ignore
    //         this.products= JSON.parse(localStorage.getItem('datas'))
    //     console.log("docheck")
    //
    // }
    //Admin sayfasında kaydedilen ürünün görülmesi için

}
