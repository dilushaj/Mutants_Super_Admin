import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views.component';

const routes: Routes = [
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
            {path: 'admin/users', loadChildren: './manage-user/manage-user.module#ManageUserModule'},
            {path: 'admin/manage-branch', loadChildren: './manage-branch/manage-branch.module#ManageBranchModule'},
            {path: 'admin/product-categories', loadChildren: './product-categories/product-categories.module#ProductCategoriesModule'},
            {path: 'admin/master-data', loadChildren: './master-data/master-data.module#MasterDataModule'},
            {path: 'admin/brands', loadChildren: './brand/brand.module#BrandModule'}

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewsRoutingModule {
}
