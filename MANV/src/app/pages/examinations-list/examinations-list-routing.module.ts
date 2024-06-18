import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExaminationsListPage } from './examinations-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExaminationsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationsListPageRoutingModule {}
