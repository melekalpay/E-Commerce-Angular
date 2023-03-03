import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import {RegisterRoutingModule} from "./register-routing.module";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {PaginatorModule} from "primeng/paginator";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RatingModule} from "primeng/rating";
import {RippleModule} from "primeng/ripple";
import {InputTextareaModule} from "primeng/inputtextarea";



@NgModule({
  declarations: [
    RegisterComponent
  ],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        DividerModule,
        ButtonModule,
        ChipsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
        ToolbarModule,
        FileUploadModule,
        TableModule,
        DialogModule,
        DropdownModule,
        RadioButtonModule,
        PaginatorModule,
        ConfirmDialogModule,
        RatingModule,
        RippleModule,
        InputTextareaModule
    ]
})
export class RegisterModule { }
