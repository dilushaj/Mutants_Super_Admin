import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {GlobalData, MainConfig} from '../../../shared';
import {CornerService} from '../../../module-services/corner.service';
import {Subject} from 'rxjs/Subject';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: []
})
export class UserViewComponent implements OnInit {

  public userDetails: any = {};
  public cornerTypes: any = [];
  public onClose: Subject<boolean>;
  action: String;

  constructor( public bsModalRef: BsModalRef, private modalService: BsModalService, public globalData: GlobalData, private cornerSev: CornerService)
  {
    this.onClose = new Subject();
  }

  ngOnInit() {
    this.initCornerTypes();

    setTimeout(()=>{
      if(this.action == "view"){
        this.initUserView();
      }
    },0);
  }

  private initUserView(){
    for(var key in this.cornerTypes){
      for(var i in this.cornerTypes[key].points) {
        switch (this.cornerTypes[key].key) {
          case 'PREPARATION':
            if (this.userDetails.preparationPoint === this.cornerTypes[key].points[i].shopCornerId){
              this.cornerTypes[key].selected = this.cornerTypes[key].points[i];
            }
            break;
          case 'SERVING_POINT':
            if (this.userDetails.servingPoint === this.cornerTypes[key].points[i].shopCornerId){
              this.cornerTypes[key].selected = this.cornerTypes[key].points[i];
            }
            break;
          case 'CONSUMING_POINT':
            if (this.userDetails.consumingPoint === this.cornerTypes[key].points[i].shopCornerId){
              this.cornerTypes[key].selected = this.cornerTypes[key].points[i];
            }
            break;
        }
      }
    }
    this.userDetails.cornerTypes = this.cornerTypes;
    if(this.userDetails.superAdmin){
      this.userDetails.superAdmin = "Yes";
    }else{
      this.userDetails.superAdmin = "No";
    }
  }

  private initCornerTypes() {
    for(let key in this.globalData.domainProperty.CORNER) {
      if(this.globalData.domainFeatures['USER_'+this.globalData.domainProperty.CORNER[key].KEY]){
        this.cornerTypes.push({
          key : this.globalData.domainProperty.CORNER[key].KEY,
          id: this.globalData.domainProperty.CORNER[key].ID,
          name: this.globalData.domainProperty.CORNER[key].NAME,
          points:[
            {
              "shopCornerId" : 0,
              "name" : "All"
            }
          ]
        });
      }
    }
    for(var key in this.cornerTypes){
      this.initWorkFlowPoints(this.cornerTypes[key].id,key);
    }
  }

  private initWorkFlowPoints(id, key) {
    let req = {
      "shopId": this.globalData.authObject.shopId,
      "branchId": this.globalData.authObject.branchId,
      "statuses": [MainConfig.STATUS_LIST.APPROVED.ID],
      "operators":["eq"],
      "searchKeys":["type"],
      "values":[id]
    };
    this.cornerSev.cornerFindByCriteria(req).then((response : any) => {
      if(response){
        for(var i in response.data){
          this.cornerTypes[key].points.push(response.data[i]);
        }
      }
    });
  }

  onCloseUserViewModal(){
    let response : any = this.userDetails;
    this.onClose.next(response);
    this.bsModalRef.hide();
  }

}
