import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExaminationsListPageRoutingModule } from './examinations-list-routing.module';

import { ExaminationsListPage } from './examinations-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExaminationsListPageRoutingModule
  ],
  declarations: [ExaminationsListPage]
})
export class ExaminationsListPageModule {}
