import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { PageComponent } from './products/page/page.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { AdminCategoryComponent } from './admin-category/page/admin-category.component';

const routes: Routes = [
  {
    path: '',component:AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'products', component: PageComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'profile', component: ProfilePageComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
