import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { CustomerFormComponent } from './customer-form.component';
import {FormsModule} from "@angular/forms";

import {TranslateModule} from "@ngx-translate/core";
import {BsDatepickerModule, ModalModule} from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule , ModalModule.forRoot(), FormsModule, TranslateModule, BsDatepickerModule.forRoot()
  ],
  declarations: [CustomerFormComponent],
  exports : [CustomerFormComponent],
  providers : [DatePipe]
})
export class CustomerFormModule { }
