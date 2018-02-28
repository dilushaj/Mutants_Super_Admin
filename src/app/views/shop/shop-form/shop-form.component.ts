import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

import { AppConfig, MainConfig, SevConfig, ApiService, GlobalFunction, GlobalData } from './../../../shared';

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

    public fileUploadConfig : any = {};

    constructor(public bsModalRef: BsModalRef, private modalService: BsModalService, private apiSev : ApiService, private globalData: GlobalData) {}

    ngOnInit() {
        this.fileUploadConfig = {
            "width" : 200,
            "height" : 150,
            "shopId" : this.globalData.authObject.shopId,
            "type" : "shop",
            "imgUrl" : AppConfig.IMAGE_URL
        };

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

    onFileUploadEvent($event){
        console.log($event)
    }
}
