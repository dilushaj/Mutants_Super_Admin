import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import { ShopViewComponent } from './shop-view/shop-view.component';
import { ShopInfoViewComponent } from './shop-info-view/shop-info-view.component';

const routes: Routes = [
    {
        path: '',
        component: ShopComponent,
        data: {
            title: 'Order'
        },
        children: [
            { path: 'details', component: ShopViewComponent },
            { path: 'info', component: ShopInfoViewComponent }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
