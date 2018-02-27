import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopViewComponent } from './shop-view/shop-view.component';
import { ShopInfoViewComponent } from './shop-info-view/shop-info-view.component';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    TabsModule
  ],
  declarations: [ShopComponent, ShopViewComponent, ShopInfoViewComponent]
})
export class ShopModule { }
