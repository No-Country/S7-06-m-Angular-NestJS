import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from "../shared/shared.module";
import { PageComponent } from './products/page/page.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { ProfileFormComponent } from './profile/components/profile-form/profile-form.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';




@NgModule({
    declarations: [
        AdminComponent,
        PageComponent,
        ProductListComponent,
        DashboardPageComponent,
        ProfileFormComponent,
        ProfilePageComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        AlifeFileToBase64Module

    ]
})
export class AdminModule { }
