import {Component, OnInit} from '@angular/core';
import {MasterDataService} from '../../../module-services';
import {MasterDataManagementService} from '../../../module-services';
import {MasterData} from '../../../module-classes';
import * as CloneDeep from 'lodash/CloneDeep';
import { ToastNotificationService } from '../../../shared';

@Component({
  selector: 'app-reject-reasons',
  templateUrl: './reject-reasons.component.html',
  styleUrls: ['./reject-reasons.component.scss']
})
export class RejectReasonsComponent implements OnInit {
  public masterData: any = {};
  public rejectReasons: any = [];
  public domains = [];
  public rejectReason = '';
  public masterDataId = 0;

  constructor(
    private masterService: MasterDataService,
    private masterMngService: MasterDataManagementService,
    private masterObj: MasterData,
    private toastNot: ToastNotificationService
  ) {
  }

  ngOnInit() {
    this.getMasterDataCategories();
  }

  private getMasterDataCategories() {
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
            this.masterData = CloneDeep(response[0]);
            if (typeof response[0].reject_reasons === 'undefined') {
              this.rejectReasons = [];
            } else {
              this.rejectReasons = response[0].reject_reasons;
            }
          } else {
            this.masterData = {};
            this.rejectReasons = [];
          }
        }
      });
    }
  }

  addRejectReason() {
    this.rejectReasons.push(this.rejectReason);
    this.rejectReason = '';
  }

  removeRejectReason(index) {
    this.rejectReasons.splice(index, 1);
  }

  onClickReset() {
    this.rejectReasons = CloneDeep(this.masterData.reject_reasons);
  }

  onClickSave() {
    if (typeof(this.masterData._id) === 'undefined') {
      const req = {
        'masterDataId': this.masterDataId,
        'reject_reasons': this.rejectReasons,
        'status': 2
      };
      this.masterMngService.addNewMasterData(req).then((response: any) => {
        if (response) {
          this.toastNot.toastSuccess('Master Data Succesfully Added');
        }
      });
    } else {
      const req = {
        'masterDataId': this.masterDataId,
        'reject_reasons': this.rejectReasons,
        'status': this.masterData.status,
        '_id': this.masterData._id
      };
      this.masterMngService.updateMasterData(req).then((response: any) => {
        if (response) {
          this.toastNot.toastSuccess('Master Data Successfully Updated');
        }
      });

    }
  }

}
