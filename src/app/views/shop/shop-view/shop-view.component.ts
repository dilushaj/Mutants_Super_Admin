import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ShopFormComponent } from './../shop-form/shop-form.component';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: []
})
export class ShopViewComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
      this.modalService.onHide.subscribe((reason: string) => {
          console.log(reason)
      });
  }

  ngOnInit() {
  }

    onClickUpdateBtn(){
        this.openModalWithComponent();
    }

    openModalWithComponent() {
        let modelConfig : any = {
            class : 'modal-lg',
            animated : true,
            keyboard : true,
            backdrop : true,
            ignoreBackdropClick : true
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
