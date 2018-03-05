import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule }   from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { MessageBoxModule, FileUploadModule } from './../../shared';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopViewComponent } from './shop-view/shop-view.component';
import { ShopInfoViewComponent } from './shop-info-view/shop-info-view.component';
import { ShopFormComponent } from './shop-form/shop-form.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(), FormsModule,
    ShopRoutingModule,
    TabsModule,
      MessageBoxModule,
      FileUploadModule,
      NgSelectModule
  ],
  declarations: [ShopComponent, ShopViewComponent, ShopInfoViewComponent, ShopFormComponent],
  entryComponents: [
     ShopFormComponent
  ]
})
export class ShopModule { }
