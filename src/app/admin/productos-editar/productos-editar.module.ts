import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosEditarPageRoutingModule } from './productos-editar-routing.module';

import { ProductosEditarPage } from './productos-editar.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosEditarPageRoutingModule,
    SharedModule
  ],
  declarations: [ProductosEditarPage]
})
export class ProductosEditarPageModule {}
