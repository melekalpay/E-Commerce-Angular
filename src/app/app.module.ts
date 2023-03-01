import { NgModule } from '@angular/core';
import {
    CommonModule,
    CurrencyPipe,
    HashLocationStrategy,
    LocationStrategy,
    PathLocationStrategy
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {LoginModule} from "./ecommerce/login/login.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {PaginatorModule} from "primeng/paginator";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RippleModule} from "primeng/ripple";
import {ChipsModule} from "primeng/chips";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AdminModule} from "./ecommerce/admin/admin.module";
import {UserModule} from "./ecommerce/user/user.module";
import {CardModule} from "./ecommerce/shoppingcard/card.module";
import {HttpClientModule} from "@angular/common/http";
import {ProductDetailModule} from "./ecommerce/productdetails/productdetail.module";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        LoginModule,
        NgbModule,
        CurrencyPipe,
        RatingModule,
        FormsModule,
        AdminModule,
        UserModule,
        ButtonModule,
        ToolbarModule,
        ToastModule,
        DialogModule,
        DropdownModule,
        RadioButtonModule,
        PaginatorModule,
        ConfirmDialogModule,
        RippleModule,
        ChipsModule,
        InputTextareaModule,
        CardModule,
        HttpClientModule,
        ProductDetailModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
