import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductDetailComponent} from "./productdetail.component";


@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: ProductDetailComponent}
    ])],
    exports: [RouterModule]
})
export class ProductDetailRoutingModule {
}
