import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'mimu', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) }, 
  { path: 'user', loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) },
  { path:'**', redirectTo:'mimu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
