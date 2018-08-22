import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MasterDataComponent} from './master-data.component';
import {ProductGroupsComponent} from './product-groups/product-groups.component';
import {RejectReasonsComponent} from './reject-reasons/reject-reasons.component';
import {MeasurementUnitComponent} from './measurement-unit/measurement-unit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterDataComponent,
    data: {
      title: 'Master Data'
    },
    children: [
      {path: 'product-groups', component: ProductGroupsComponent},
      {path: 'reject-reasons', component: RejectReasonsComponent},
      {path: 'measurement-unit', component: MeasurementUnitComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule {
}
