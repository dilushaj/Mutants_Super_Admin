import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { DataGridModule } from './../../../shared';
import { OrderViewModule } from './../order-view/order-view.module';
import { OrderAcceptModule } from './../order-accept/order-accept.module';
import { OrderRejectModule } from './../order-reject/order-reject.module';
import { OrderListComponent } from './order-list.component';


@NgModule({
  imports: [
    CommonModule, DataGridModule, TranslateModule, OrderViewModule, OrderAcceptModule, OrderRejectModule
  ],
  declarations: [OrderListComponent],
  exports: [OrderListComponent],
  providers: []
})
export class OrderListModule { }
