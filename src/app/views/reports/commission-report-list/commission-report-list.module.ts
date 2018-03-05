import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';

import { DataGridModule } from './../../../shared';
import { CommissionReportListComponent } from './commission-report-list.component';
import { ExpandSalesReportModule} from '../expand-sales-report/expand-sales-report.module';


@NgModule({
  imports: [
    CommonModule, DataGridModule, TranslateModule, BsDatepickerModule.forRoot(), FormsModule, ExpandSalesReportModule
  ],
  declarations: [CommissionReportListComponent],
  exports: [CommissionReportListComponent],
  providers: []
})
export class CommissionReportListModule { }

