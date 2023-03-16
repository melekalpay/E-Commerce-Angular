import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {LoginRoutingModule} from "./login-routing.module";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageModule} from "primeng/message";



@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        DividerModule,
        ButtonModule,
        ChipsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MessageModule
    ]
})
export class LoginModule { }
