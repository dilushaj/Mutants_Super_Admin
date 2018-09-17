import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './brand.component';
import { BrandListComponent } from './brand-list/brand-list.component';

const routes: Routes = [
  {
    path: '',
    component: BrandComponent,
    data: {
      title: 'Brands'
    },
    children: [
      { path: 'details', component: BrandListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
