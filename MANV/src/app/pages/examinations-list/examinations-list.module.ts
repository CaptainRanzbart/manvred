import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExaminationsListPageRoutingModule } from './examinations-list-routing.module';

import { ExaminationsListPage } from './examinations-list.page';
import { ExaminationComponent } from 'src/app/components/examination/examination.component';
import { ExaminationModule } from 'src/app/components/examination/examination.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExaminationModule,
    ExaminationsListPageRoutingModule
  ],
  declarations: [ExaminationsListPage]
})
export class ExaminationsListPageModule {}
