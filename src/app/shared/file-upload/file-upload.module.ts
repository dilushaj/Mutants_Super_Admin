import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
  imports: [
    CommonModule, ProgressbarModule.forRoot()
  ],
  declarations: [FileUploadComponent],
  exports: [FileUploadComponent]
})
export class FileUploadModule { }
