import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosEditarPage } from './productos-editar.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosEditarPageRoutingModule {}
