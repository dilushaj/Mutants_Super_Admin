import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ExpandSalesReportComponent } from './expand-sales-report.component';
import { DataGridModule } from './../../../shared';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule, DataGridModule
  ],
  declarations: [ExpandSalesReportComponent],
  exports: [ExpandSalesReportComponent]
})
export class ExpandSalesReportModule { }

