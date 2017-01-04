import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { AuthGuard } from '../user/auth-guard.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      {
        path: '',                             // component-less route
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'products',
            component: ProductListComponent
          },
          {
            path: 'product/:id',
            component: ProductDetailComponent
          },
          {
            path: 'productEdit/:id',
            canDeactivate: [ ProductEditGuard ],
            component: ProductEditComponent
          },
        ]
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe
  ],
  providers: [
    ProductService,
    ProductDetailGuard,
    ProductEditGuard
  ]
})
export class ProductModule { }
