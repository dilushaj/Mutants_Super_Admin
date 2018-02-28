import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ShopFormComponent } from './../shop-form/shop-form.component';
import { ShopService } from './../../../module-services';
import { AppConfig, MainConfig, GlobalFunction, GlobalData } from './../../../shared';

@Component({
    selector: 'app-shop-view',
    templateUrl: './shop-view.component.html',
    styleUrls: []
})
export class ShopViewComponent implements OnInit {

    bsModalRef:BsModalRef;

    constructor(private modalService:BsModalService, private shopSev : ShopService, public globalData : GlobalData) {

        this.modalService.onHide.subscribe((reason:string) => {
            console.log(reason);
        });
    }

    ngOnInit() {
        this.getShopById();
    }

    onClickUpdateBtn() {
        this.openModalWithComponent();
    }

    private getShopById(){
        let req = {
            "shopId":this.globalData.authObject.shopId,
            "branchId":this.globalData.authObject.branchId,
            "statuses":[0,1,2,6],
            "offset":0,
            "limit":1
        };
        this.shopSev.shopFindByCriteria(req).then((response : any) => {

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
        this.bsModalRef.content.title = 'Modal with component';
        this.bsModalRef.content.list = [
            'Open a modal with component',
            'Pass your data',
            'Do something else',
            '...'
        ];
        this.bsModalRef.content.closeBtnName = 'Close';
    }

}
