import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from "../shared/shared.module";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AdminComponent } from './admin.component';
import { PageComponent } from './products/page/page.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { ProfileFormComponent } from './profile/components/profile-form/profile-form.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { AdminCategoryComponent } from './admin-category/page/admin-category.component';

@NgModule({
  declarations: [
    AdminComponent,
    PageComponent,
    ProductListComponent,
    DashboardPageComponent,
    ProfileFormComponent,
    ProfilePageComponent,
    AdminCategoryComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class AdminModule { }
