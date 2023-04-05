import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { ProfileComponent } from './pages/profile/profile.component';
import { PageComponent } from './products/page/page.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';

@NgModule({
    declarations: [
        AdminComponent,
        DashboardComponent,
        ProfileComponent,
        PageComponent,
        ProductListComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }
