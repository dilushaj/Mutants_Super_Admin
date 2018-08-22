import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { MasterDataComponent } from './master-data.component';
import { ProductGroupsComponent } from './product-groups/product-groups.component';
import { RejectReasonsComponent } from './reject-reasons/reject-reasons.component';
import { MeasurementUnitComponent } from './measurement-unit/measurement-unit.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {DataGridModule, FileUploadModule, MessageBoxModule} from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    ModalModule.forRoot(), FormsModule,
    TabsModule,
    MessageBoxModule,
    FileUploadModule,
    NgSelectModule,
    DataGridModule
  ],
  declarations: [MasterDataComponent, ProductGroupsComponent, RejectReasonsComponent, MeasurementUnitComponent]
})
export class MasterDataModule { }
