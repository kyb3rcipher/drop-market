import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosCrearPage } from './productos-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosCrearPageRoutingModule {}
