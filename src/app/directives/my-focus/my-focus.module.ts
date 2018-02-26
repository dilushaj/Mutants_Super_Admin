import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFocusDirective } from './my-focus.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MyFocusDirective],
  exports: [MyFocusDirective],
})
export class MyFocusModule { }
