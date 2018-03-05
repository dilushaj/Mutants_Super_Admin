import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderRejectComponent } from './order-reject.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule, FormsModule
  ],
  declarations: [OrderRejectComponent],
  exports: [OrderRejectComponent]
})
export class OrderRejectModule { }
