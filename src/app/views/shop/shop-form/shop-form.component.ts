import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

import { MainConfig, SevConfig, ApiService, GlobalFunction } from './../../../shared';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: []
})
export class ShopFormComponent implements OnInit {

    title: string;
    closeBtnName: string;
    list: any[] = [];
    adminUser : any = {};
    url : any = null;
    progress : any = 0;

    constructor(public bsModalRef: BsModalRef, private modalService: BsModalService, private apiSev : ApiService) {}

    ngOnInit() {
        this.list.push('PROFIT!!!');
    }

    onCloseModal(){
        let data : any = {
            class : 'modal-lg',
            animated : "123"
        };
        this.modalService.setDismissReason(data);
        this.bsModalRef.hide();
    }

    onChooseFile(files: FileList) {
        let fileToUpload = files.item(0);
        var req = {
            "file" : fileToUpload,
            "shopId" : 2,
            "type" : "type",
        };
        let promise = new Promise((resolve, reject) => {
            return this.apiSev.httpPostFile(SevConfig.IMG_SEV,"/upload",req,null).then((response : any) => {
                console.log(response.fileName);
                this.url = "http://192.168.1.200:90/images/"+response.fileName;
                if(response){
                    this.progress = 100;
                    setTimeout(()=>{
                        this.progress = 0;
                    },1000);
                }else{
                    resolve(null);
                }
            }).catch(error => {
                resolve(null);
            });
        });
    }

}
