import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SalesReportPageComponent} from './sales-report-page.component';
import {SalesReportListComponent} from './sales-report-list/sales-report-list.component';
import {CommissionReportPageComponent} from './commission-report-page.component';
import {CustomerReportPageComponent} from './customer-report-page.component';


const routes: Routes = [
  {
    path: 'sales',
    component: SalesReportPageComponent,
    data: {
      title: 'Sales Report'
    },
    children: [
      { path: 'pending', component: SalesReportListComponent },
      { path: 'approved', component: SalesReportListComponent },
      { path: 'rejected', component: SalesReportListComponent }
    ]
  },
  {
    path: 'commission',
    component: CommissionReportPageComponent,
    data: {
      title: 'Commission Report'
    }
  },
  {
    path: 'customer',
    component: CustomerReportPageComponent,
    data: {
      title: 'Customer Report'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
