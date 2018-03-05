import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRoutingModule } from './message-routing.module';
import { MessagePageComponent } from './message-page.component';
import { MessageListModule } from './message-list/message-list.module';

@NgModule({
  imports: [
    CommonModule,
    MessageRoutingModule,
    MessageListModule
  ],
  declarations: [MessagePageComponent]
})
export class MessageModule { }

