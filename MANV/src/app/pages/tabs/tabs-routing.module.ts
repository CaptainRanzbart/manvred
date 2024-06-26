import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'examinations',
        loadChildren: () =>
          import('../examinations-list/examinations-list.module').then((m) => m.ExaminationsListPageModule),
      },
      {
        path: 'examinations/:id',
        loadChildren: () => import('../../pages/examination-detail/examination-detail.module').then( m => m.ExaminationDetailPageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
