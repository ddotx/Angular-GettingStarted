import { NgModule } from "@angular/core";
import { RouterModule, PreloadAllModules } from "@angular/router";

import { WelcomeComponent } from "./home/welcome.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { AuthGuard } from "./user/auth.guard";
import { SelectiveStrategy } from "./selective-strategy.service";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'home', component: WelcomeComponent },
            { path: 'welcome', redirectTo: 'home', pathMatch: 'full' },

            //*===Lazy Loading & CanLoad Guard
            // {
            //     path: 'products',
            //     canLoad: [AuthGuard],
            //     data: { preload: true }, //*==> For Custom Preloading Strategy
            //     loadChildren: './products/product.module#ProductModule'
            // },

            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ],
            // { enableTracing: true },
            // {preloadingStrategy: PreloadAllModules} //*==> Preloading Feature Modules
            // {preloadingStrategy: SelectiveStrategy} //*==> Custom Preloading Strategy
        )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { };