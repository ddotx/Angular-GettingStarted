import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ProductListComponent } from "./product-list.component";
import { ProductDetailGuard } from "./product-detail.guard";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductEditGuard } from "./product-edit/product-edit.guard";
import { ProductResolver } from "./product-resolver.service";
import { ProductEditInfoComponent } from "./product-edit/product-edit-info.component";
import { ProductEditTagsComponent } from "./product-edit/product-edit-tags.component";
import { AuthGuard } from "../user/auth.guard";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'products',
                // canLoad: [AuthGuard],
                component: ProductListComponent
            },
            {
                path: 'products/:id',
                canActivate: [ProductDetailGuard, AuthGuard],
                component: ProductDetailComponent,
                resolve: {resolvedData: ProductResolver}
            },
            {
                path: 'products/:id/edit',
                canActivate: [AuthGuard],
                canDeactivate: [ProductEditGuard],
                component: ProductEditComponent,
                resolve: {resolvedData: ProductResolver},
                children: [
                    {
                        path: 'info',
                        component: ProductEditInfoComponent
                    },
                    {
                        path: 'tags',
                        component: ProductEditTagsComponent
                    }
                ]
            },
        ])
    ],
    exports: [RouterModule]
})
export class ProductRoutingModule { }