import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExaminationDetailPageRoutingModule } from './examination-detail-routing.module';

import { ExaminationDetailPage } from './examination-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExaminationDetailPageRoutingModule
  ],
  declarations: [ExaminationDetailPage]
})
export class ExaminationDetailPageModule {}
