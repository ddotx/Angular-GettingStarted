import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//! === Imports for loading & configuring the in-memory web api ===
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';

import { ProductListComponent } from './product-list.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductDetailComponent } from './product-detail.component';

import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    InMemoryWebApiModule.forRoot(ProductData, {delay: 2000}),
    // InMemoryWebApiModule.forFeature(ProductData),
    ProductRoutingModule
  ]
})
export class ProductModule { }
