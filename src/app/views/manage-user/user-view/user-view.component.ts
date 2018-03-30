import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: []
})
export class UserViewComponent implements OnInit {

  public userDetails: any = {};

  constructor(
    public bsModalRef: BsModalRef,
    ) { }

  ngOnInit() {
  }

  onCloseUserViewModal(){
    this.bsModalRef.hide();
  }

}
