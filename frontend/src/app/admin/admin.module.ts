import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from "../shared/shared.module";
import { PageComponent } from './products/page/page.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';

@NgModule({
    declarations: [
        AdminComponent,
        PageComponent,
        ProductListComponent,
        DashboardPageComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }
