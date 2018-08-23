import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../../../module-services';
import {MasterDataManagementService } from '../../../module-services';
import { MasterData } from '../../../module-classes';

@Component({
  selector: 'app-product-groups',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.scss']
})
export class ProductGroupsComponent implements OnInit {
public masterData= {};
public productGroups= [];
public domains = [];
public record = {
  'key': '',
  'value': ''
};

  constructor(
    private masterService: MasterDataService,
    private masterMngService: MasterDataManagementService,
    private masterObj: MasterData
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
     this.productGroups = [];
    if (masterDataId !== null) {
      this.masterService.getMasterData(masterDataId).then((response: any) => {
        if (response) {
          if (response.length !== 0) {
            this.masterData = response[0];
            const groupkeys = Object.keys(response[0].product_groups);
            for (const group of groupkeys) {
              this.productGroups.push({'key': group, 'value': response[0].product_groups[group].name});
            }
            }
          } else {
          this.masterData = {};
          this.productGroups = [];
        }
      });
    }
  }
  // private addProductGroup(req) {
  //   const req = this.masterObj.analyzeNewMasterData()
  //   this.masterMngService.addProductCategory()
  // }


}
