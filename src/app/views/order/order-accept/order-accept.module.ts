import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderAcceptComponent } from './order-accept.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule, FormsModule
  ],
  declarations: [OrderAcceptComponent],
  exports: [OrderAcceptComponent]
})
export class OrderAcceptModule { }

