import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {ProductInfoComponent} from './product-info.component';

import {productResolver} from '../../shared/services/resolvers/product/product.resolver';

const routes: Routes = [
  {path: ':id', component: ProductInfoComponent, resolve: { product: productResolver} }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductInfoRoutingModule { }
