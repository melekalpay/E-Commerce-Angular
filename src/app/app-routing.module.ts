import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./auth/auth.guard";
import {AdminGuard} from "./auth/admin.guard";
import {UserGuard} from "./auth/user.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppComponent,
                children: [
                    { path: '', loadChildren: () => import('./ecommerce/login/login.module').then(m => m.LoginModule) },
                    { path: 'admin',canActivate:[AdminGuard], loadChildren: () => import('./ecommerce/admin/admin.module').then(m => m.AdminModule) },
                    { path: 'user', canActivate:[UserGuard], loadChildren: () => import('./ecommerce/user/user.module').then(m => m.UserModule) },
                    { path: 'card',canActivate:[UserGuard], loadChildren: () => import('./ecommerce/shoppingcard/card.module').then(m => m.CardModule) },
                    { path: 'product/:id',canActivate:[UserGuard], loadChildren: () => import('./ecommerce/productdetails/productdetail.module').then(m => m.ProductDetailModule) }
                    // { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    // { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    // { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
