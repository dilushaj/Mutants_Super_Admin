import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../../../module-services';
import {MasterDataManagementService } from '../../../module-services';
import { MasterData } from '../../../module-classes';


@Component({
  selector: 'app-reject-reasons',
  templateUrl: './reject-reasons.component.html',
  styleUrls: ['./reject-reasons.component.scss']
})
export class RejectReasonsComponent implements OnInit {
  public masterData= {};
  public rejectReasons= [];
  public domains = [];
  public rejectReason = '';
  constructor(
    private masterService: MasterDataService,
    private masterMngService: MasterDataManagementService,
    private masterObj: MasterData
  ) {}

  ngOnInit() {
    this.getMasterDataCategories();
  }

  private getMasterDataCategories () {
    this.masterService.getShopCategories().then((response: any) => {
      if (response) {
        this.domains = response;
        console.log('Master Data successfully taken');
      } else {
        console.log('Error occured');
      }
    });
  }
  getRejectReasons(masterDataId) {
    this.rejectReasons = [];
    if (masterDataId !== null) {
      this.masterService.getMasterData(masterDataId).then((response: any) => {
        if (response) {
          if (response.length !== 0) {
            this.masterData = response[0];
            this.rejectReasons = response[0].reject_reasons;
          }
        } else {
          this.masterData = {};
          this.rejectReasons = [];
        }
      });
    }
  }
  addRejectReason() {
  this.rejectReasons.push(this.rejectReason);
  this.rejectReason = '';
  }

  removeRejectReason(index) {
    console.log(index);
  }

}
// <li ng-repeat="rejectReason in masterData.reject_reasons track by $index" ng-init="reasonRow = {'edit':true};" style="padding: 5px 0px;" class="ng-scope">
// <span style="margin: 0 15px 0 0;">
// <button type="button" class="btn btn-danger btn-xs" data-ng-click="removeRejectReason($index);">
// <i class="fa fa-times" aria-hidden="true"></i>
// </button>
// </span>
// <span>
// <span ng-show="!reasonRow.edit" class="ng-binding" aria-hidden="false">Late Delivery</span>
// <input ng-show="reasonRow.edit" type="text" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-required ng-hide" ng-init="reasonRow.edit=false" ng-model="rejectReason" placeholder="Enter New Reject Reason" style="display: inline;width: auto;" ng-required="reasonRow.edit" aria-hidden="true" aria-invalid="false">
//   </span>
//   </li>
