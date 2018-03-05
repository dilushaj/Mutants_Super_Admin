import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagePageComponent } from './message-page.component';

const routes: Routes = [
  {
    path: '',
    component: MessagePageComponent,
    data: {
      title: 'Message'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
