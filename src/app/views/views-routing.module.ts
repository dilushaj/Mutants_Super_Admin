import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views.component';

const routes:Routes = [
    {
        path: '',
        component: ViewsComponent,
        data: {
            title: 'Home'
        },
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
            {path: 'admin/shop', loadChildren: './shop/shop.module#ShopModule'},
            {path: 'admin/wfp', loadChildren: './corner/corner.module#CornerModule'},
            {path: 'admin/users', loadChildren: './manage-user/manage-user.module#ManageUserModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewsRoutingModule {
}
