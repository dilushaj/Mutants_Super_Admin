import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPageComponent } from './order-page.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPageComponent,
    data: {
      title: 'Order'
    },
    children: [
      { path: 'pending', component: OrderListComponent },
      { path: 'approved', component: OrderListComponent },
      { path: 'rejected', component: OrderListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
