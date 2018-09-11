import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApiService } from './../services';
import { MainConfig, SevConfig } from './../config';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

    @Input() config : any;
    @Output() onFileUploadEvent : EventEmitter <any> = new EventEmitter();

   public uploadedUrl : any = null;
   public uploadProgress : any = 0;

  constructor(private apiSev : ApiService) { }

  ngOnInit() {
    this.uploadedUrl = this.config.image;
  }

    onChooseFile(files: FileList) {
        let fileToUpload = files.item(0);
        let req = {
            "file" : fileToUpload,
            "shopId" : this.config.shopId,
            "type" : this.config.type
        };
        this.apiSev.httpPostFile(SevConfig.IMG_SEV,"/upload",req,null).then((response : any) => {
            this.uploadedUrl = this.config.imgUrl+response.fileName;
            if(response){
                this.uploadProgress = 100;
                setTimeout(()=>{
                    this.uploadProgress = 0;
                },1000);
                this.onFileUploadEvent.emit({type:"uploaded",data:response});
            }else{
                this.onFileUploadEvent.emit({type:"error",data:null});
            }
        }).catch(error => {
            this.onFileUploadEvent.emit({type:"error",data:error});
        });
    }

    onDeleteImg(){
        this.uploadedUrl = null;
            this.onFileUploadEvent.emit({type:"deleted",data:null});
    }

}
