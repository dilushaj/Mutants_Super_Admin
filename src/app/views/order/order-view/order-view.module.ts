import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { OrderViewComponent } from './order-view.component';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule
  ],
  declarations: [OrderViewComponent],
  exports: [OrderViewComponent]
})
export class OrderViewModule { }
