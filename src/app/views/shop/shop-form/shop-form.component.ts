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

    public shopDetail : any = {};
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
        setTimeout(()=>{
            console.log(this.shopDetail);
        },0);
    }

    onCloseModal(){
        let response : any = this.shopDetail;
        this.modalService.setDismissReason(response);
        this.bsModalRef.hide();
    }

    onFileUploadEvent($event){
        console.log($event);
    }
}
