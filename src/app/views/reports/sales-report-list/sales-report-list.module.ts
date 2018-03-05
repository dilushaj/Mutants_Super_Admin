import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';

import { SalesReportListComponent } from './sales-report-list.component';
import { DataGridModule } from './../../../shared';
import { ExpandSalesReportModule} from '../expand-sales-report/expand-sales-report.module';

@NgModule({
  imports: [
    CommonModule, DataGridModule, TranslateModule, BsDatepickerModule.forRoot(), FormsModule, ExpandSalesReportModule
  ],
  declarations: [SalesReportListComponent],
  exports: [SalesReportListComponent],
  providers: [DatePipe]
})
export class SalesReportListModule { }



