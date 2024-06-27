import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationComponent } from './examination.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ExaminationComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ExaminationComponent]
})
export class ExaminationModule { }
