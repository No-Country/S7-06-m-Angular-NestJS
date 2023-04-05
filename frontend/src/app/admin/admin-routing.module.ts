import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageComponent } from './products/page/page.component';

const routes: Routes = [
  {
    path: '',component:AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: PageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
