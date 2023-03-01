import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {TableModule} from "primeng/table";
import {ProductDetailComponent} from "./productdetail.component";
import {ProductDetailRoutingModule} from "./productdetail-routing.module";
import {UserModule} from "../user/user.module";
import {MenubarModule} from "primeng/menubar";
import {DialogModule} from "primeng/dialog";
import {CommentComponent} from "../comment/comment.component";
import {HeaderComponent} from "../header/header.component";




@NgModule({
  declarations: [
    ProductDetailComponent
  ],
    imports: [
        CommonModule,
        ProductDetailRoutingModule,
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
        UserModule,
        MenubarModule,
        DialogModule,
        CommentComponent,
        HeaderComponent
    ]
})
export class ProductDetailModule { }
