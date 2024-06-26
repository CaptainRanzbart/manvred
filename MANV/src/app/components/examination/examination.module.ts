import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationComponent } from './examination.component';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  declarations: [ExaminationComponent],
  imports: [
    CommonModule,
  ],
  exports: [ExaminationComponent]
})
export class ExaminationModule { }
