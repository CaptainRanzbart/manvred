import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExaminationDetailPage } from './examination-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ExaminationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationDetailPageRoutingModule {}
