import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import {CardRoutingModule} from "./card-routing.module";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {TableModule} from "primeng/table";
import {StockComponent} from "../stock/stock.component";



@NgModule({
  declarations: [
    CardComponent
  ],
    imports: [
        CommonModule,
        CardRoutingModule,
        DividerModule,
        ButtonModule,
        ChipsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        CheckboxModule,
        TableModule,
        StockComponent
    ]
})
export class CardModule { }
