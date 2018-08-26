import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../../../module-services';
import {MasterDataManagementService } from '../../../module-services';
import { MasterData } from '../../../module-classes';
import * as CloneDeep from 'lodash/CloneDeep';
import { ToastNotificationService } from '../../../shared';

@Component({
  selector: 'app-product-groups',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.scss']
})
export class ProductGroupsComponent implements OnInit {
public masterData: any = {};
public productGroups1 = [];
public productGroups: any = {};
public domains = [];
public record: any= {
  'key': '',
  'value': {}
};
public masterDataId = 0;


  constructor(
    private masterService: MasterDataService,
    private masterMngService: MasterDataManagementService,
    private masterObj: MasterData,
    private toastNot: ToastNotificationService
  ) { }

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
  getProductGroups(masterDataId) {
    this.productGroups = {} ;
    if (masterDataId !== null) {
      this.masterService.getMasterData(masterDataId).then((response: any) => {
        if (response) {
          if (response.length !== 0) {
            this.masterData = CloneDeep(response[0]);
            if (typeof response[0].product_groups === 'undefined') {
              this.productGroups = {};
            } else {
              this.productGroups = response[0].product_groups;
            }
          } else {
            this.masterData = {};
            this.productGroups = {};
          }
        }
      });
    }
  }
  removeGroup(key) {
     delete this.productGroups[key];
     this.productGroups = CloneDeep(this.productGroups);
  }
  onClickSave() {
    this.productGroups = this.getFinalProductGroups(this.productGroups);
    if (typeof(this.masterData._id) === 'undefined') {
      const req = {
        'masterDataId': this.masterDataId,
        'product_groups': this.productGroups,
        'status': 2
      };
      this.masterMngService.addNewMasterData(req).then((response: any) => {
        if (response) {
          this.toastNot.toastSuccess('Product Group Succesfully Added');
          this.getProductGroups(this.masterDataId);
        }
      });
    } else {
      const req = {
        'masterDataId': this.masterDataId,
        'product_groups': this.productGroups,
        'status': this.masterData.status,
        '_id': this.masterData._id
      };
      this.masterMngService.updateMasterData(req).then((response: any) => {
        if (response) {
          this.toastNot.toastSuccess('Product Groups Successfully Updated');
          this.getProductGroups(this.masterDataId);
        }
      });

    }
  }
  onClickReset() {
    this.productGroups = CloneDeep(this.masterData.product_groups);
  }
  addProductGroup(key, value) {
    const prodVal = {'name': value.name};
    this.productGroups[key] = prodVal;
    this.productGroups = CloneDeep(this.productGroups);
    this.record.key = '';
    this.record.value.name = '';
  }
  private getFinalProductGroups(productGroups) {
    const groupkeys = Object.keys(productGroups);
      for (const group of groupkeys) {
        if (productGroups[group].hasOwnProperty('edit')) {
          delete productGroups[group]['edit'];
        }
        }
        return productGroups;
  }
}
