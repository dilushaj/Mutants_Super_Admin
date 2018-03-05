import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ReportsRoutingModule } from './reports-routing.module';
import { DataGridModule } from './../../shared';
import { SalesReportPageComponent } from './sales-report-page.component';
import { CommissionReportPageComponent } from './commission-report-page.component';

import { SalesReportListModule } from './sales-report-list/sales-report-list.module';
import { CommissionReportListModule } from './commission-report-list/commission-report-list.module';
import { ExpandSalesReportModule } from './expand-sales-report/expand-sales-report.module';
import { CustomerReportPageComponent } from './customer-report-page.component';
import { CustomerReportListModule } from './customer-report-list/customer-report-list.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReportsRoutingModule,
    ModalModule.forRoot(),
    TabsModule,
    DataGridModule,
    CommissionReportListModule,
    ExpandSalesReportModule,
    SalesReportListModule,
    CustomerReportListModule
    //FormsModule
  ],
  declarations: [ SalesReportPageComponent, CommissionReportPageComponent, CustomerReportPageComponent]
})
export class ReportsModule { }

