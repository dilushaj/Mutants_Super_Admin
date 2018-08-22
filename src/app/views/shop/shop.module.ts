import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { MessageBoxModule, FileUploadModule, DataGridModule } from './../../shared';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopViewComponent } from './shop-list-view/shop-view.component';
import { ShopInfoViewComponent } from './shop-info-view/shop-info-view.component';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { NewShopFormComponent } from './new-shop-form/new-shop-form.component';
import {FilterPipe} from './shop-list-view/filter.pipe';


@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(), FormsModule,
    ShopRoutingModule,
    TabsModule,
      MessageBoxModule,
      FileUploadModule,
      NgSelectModule,
      DataGridModule
  ],
  declarations: [ShopComponent, ShopViewComponent, ShopInfoViewComponent, ShopFormComponent, NewShopFormComponent, FilterPipe],
  entryComponents: [
     ShopFormComponent,
    NewShopFormComponent
  ],
  exports: [NewShopFormComponent]
})
export class ShopModule { }
