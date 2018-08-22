import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoriesComponent } from './product-categories.component';
import { ProductCategoriesRoutingModule } from './product-categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { NewCategoryFormComponent } from './new-category-form/new-category-form.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { MessageBoxModule, FileUploadModule, DataGridModule } from './../../shared';

@NgModule({
  imports: [
    CommonModule,
    ProductCategoriesRoutingModule,
    ModalModule.forRoot(), FormsModule,
    TabsModule,
    MessageBoxModule,
    FileUploadModule,
    NgSelectModule,
    DataGridModule
  ],
  declarations: [CategoryListComponent, NewCategoryFormComponent, ProductCategoriesComponent],
  entryComponents: [
    NewCategoryFormComponent
  ]
})
export class ProductCategoriesModule { }
