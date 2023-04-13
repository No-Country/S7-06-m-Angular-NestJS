import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from './shared/guards/admin-guard.guard';
import { UserGuardGuard } from './shared/guards/user-guard.guard';

const routes: Routes = [
  { path:'mimu', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) }, 
  { path: 'user', loadChildren: () => import('./private/private.module').then(m => m.PrivateModule), canActivate:[UserGuardGuard]},
  { path:'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[AdminGuardGuard]},
  { path:'**', redirectTo:'mimu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
