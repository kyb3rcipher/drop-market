import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { ProductosCrearPageRoutingModule } from './productos-crear-routing.module';

import { ProductosCrearPage } from './productos-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosCrearPageRoutingModule,
    SharedModule
  ],
  declarations: [ProductosCrearPage]
})
export class ProductosCrearPageModule {}
