import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    standalone: true
})
export class StockComponent implements OnInit {

    stock: string = "INSTOCK"

    ngOnInit(): void {
    }

}
