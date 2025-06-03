import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { MarcasPageRoutingModule } from './marcas-routing.module';

import { MarcasPage } from './marcas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarcasPageRoutingModule,
    SharedModule
  ],
  declarations: [MarcasPage]
})
export class MarcasPageModule {}
