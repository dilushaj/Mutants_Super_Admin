import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { OrderRoutingModule } from './order-routing.module';
import { OrderPageComponent } from './order-page.component';
import { OrderListModule } from './order-list/order-list.module';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    OrderListModule,
    TabsModule
  ],
  declarations: [OrderPageComponent]
})
export class OrderModule { }
