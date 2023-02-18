import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {UserRoutingModule} from "./user-routing.module";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {RatingModule} from "primeng/rating";
import {RippleModule} from "primeng/ripple";
import {MenubarModule} from "primeng/menubar";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";



@NgModule({
  declarations: [
    UserComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        DividerModule,
        ButtonModule,
        ChipsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        TableModule,
        RatingModule,
        RippleModule,
        MenubarModule,
        DialogModule,
        ConfirmDialogModule
    ]
})
export class UserModule { }
