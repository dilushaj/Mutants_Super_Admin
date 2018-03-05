import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CornerComponent } from './corner.component';
import { CornerListComponent } from './corner-list/corner-list.component';

const routes: Routes = [
    {
        path: '',
        component: CornerComponent,
        data: {
            title: 'Work Flow Points'
        },
        children: [
            { path: 'manage', component: CornerListComponent }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CornerRoutingModule { }
