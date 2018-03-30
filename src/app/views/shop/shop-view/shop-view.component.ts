import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ShopFormComponent } from './../shop-form/shop-form.component';
import { ShopService } from './../../../module-services';
import { Shop } from './../../../module-classes';
import { AppConfig, MainConfig, GlobalFunction, GlobalData } from './../../../shared';

@Component({
    selector: 'app-shop-view',
    templateUrl: './shop-view.component.html',
    styleUrls: []
})
export class ShopViewComponent implements OnInit {

    bsModalRef:BsModalRef;
    public shopDetail : any = {};

    constructor(
        private modalService:BsModalService,
        private shopSev : ShopService,
        private shopObj : Shop,
        public globalData : GlobalData) {

        //this.modalService.onHide.subscribe((reason:any) => {
        //    console.log(reason);
        //});
    }

    ngOnInit() {
        this.shopDetail = this.shopObj.analyzeShop({});
        this.getShopById();
    }

    onClickUpdateBtn() {
        this.openModalWithComponent();
    }

    private getShopById(){
        let req = {
            "shopId":this.globalData.authObject.shopId,
            "branchId":this.globalData.authObject.branchId,
            "statuses":[
                MainConfig.STATUS_LIST.CREATED.ID,
                MainConfig.STATUS_LIST.PENDING.ID,
                MainConfig.STATUS_LIST.APPROVED.ID,
                MainConfig.STATUS_LIST.SUSPENDED.ID
            ],
            "offset":0,
            "limit":1
        };
        this.shopSev.shopFindByCriteria(req).then((response : any) => {
            if(response){
                this.shopDetail = response.data[0];
            }
        });
    }

    private openModalWithComponent() {
        let modelConfig:any = {
            class: 'modal-lg',
            animated: true,
            keyboard: true,
            backdrop: true,
            ignoreBackdropClick: true
        };
        this.bsModalRef = null;
        this.bsModalRef = this.modalService.show(ShopFormComponent, modelConfig);
        this.bsModalRef.content.shopDetail = this.shopDetail;
        this.bsModalRef.content.onClose.subscribe(result => {
            console.log('results', result);
        })
    }

}
