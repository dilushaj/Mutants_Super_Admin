import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: []
})
export class ShopFormComponent implements OnInit {

    title: string;
    closeBtnName: string;
    list: any[] = [];

    constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) {}

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



}
