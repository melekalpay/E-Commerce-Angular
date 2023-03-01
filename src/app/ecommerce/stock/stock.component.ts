import {AfterContentChecked, Component, DoCheck, OnInit} from '@angular/core';
import {ProductService} from "../../demo/service/product.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Urun} from "../model/urun";
import {Router} from "@angular/router";
import {Product} from "../../demo/api/product";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    standalone:true
})
export class StockComponent implements OnInit{

    stock : string = "INSTOCK"
    ngOnInit(): void {
    }

}
