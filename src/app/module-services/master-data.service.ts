import { Injectable } from '@angular/core';

import { MainConfig, SevConfig, ApiService, GlobalFunction } from './../shared';
import { MasterData } from './../module-classes';
import * as _ from 'lodash';

@Injectable()
export class MasterDataService {

    constructor( private apiSev: ApiService,
                 private masterDataObj: MasterData,
                 private globalFun: GlobalFunction
                 ) { }
  public getShopCategories () {
    const chatogories = [];
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpGet(SevConfig.MASTER_SEV, '/shopCategories', {}, null)
        .then((data: any) => {
          if (data) {
            data.forEach((obj: any) => {
              const category = this.masterDataObj.analyzeShopCatogory(obj);
              const statusAnalyzeObj: any = this.globalFun.getStatusObject(category.status, MainConfig.STATUS_LIST);
              category.statusName = statusAnalyzeObj.name;
              category.rowStyle.status = statusAnalyzeObj.style;
              chatogories.push(category);
            });
            data = chatogories;
          }
          resolve(data);
        }).catch(error => {
          resolve(null);
        });
    });
    return promise;
  }
    public getAllEntitlements() {
      const promise = new Promise((resolve, reject) => {
        return this.apiSev.httpGet(SevConfig.MASTER_SEV, '/entitlement', {}, null)
          .then((data: any) => {
            if (data) {
              const result = this.removeDuplicates(data, 'entitlementId');
              resolve(result);
            }
          });
      });
      return promise;
    }
  private removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
    public getEntitlementsByDomain(domainId: any) {
      const entitlementList = [];
      const promise = new Promise((resolve, reject) => {
        return this.apiSev.httpGet(SevConfig.MASTER_SEV, '/domain/assignedEntitlements/' + domainId, {}, null)
          .then((data: any) => {
            if (data) {
              data.forEach((obj: any) => {
                const entitlement = this.masterDataObj.analyzeResponseEntitlement(obj);
                entitlementList.push(entitlement);
              });
              resolve(entitlementList);
            }
          });
      });
      return promise;
    }
    public getUnAssignEntitlementsByDomain(domainId) {
      const entitlementList = [];
      const promise = new Promise((resolve, reject) => {
        return this.apiSev.httpGet(SevConfig.MASTER_SEV, '/domain/unassignedEntitlements/' + domainId, {}, null)
          .then((data: any) => {
            if (data) {
              data.forEach((obj: any) => {
                const entitlement = this.masterDataObj.analyzeResponseEntitlement(obj);
                entitlementList.push(entitlement);
              });
              resolve(entitlementList);
            }
          });
      });
      return promise;
    }

  public getEntitlementsByShop(shopId: any) {
    const entitlementList = [];
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpGet(SevConfig.MASTER_SEV, '/entitlements/' + shopId, {}, null)
        .then((data: any) => {
          if (data) {
            data.forEach((obj: any) => {
              const entitlement = this.masterDataObj.analyzeResponseEntitlement(obj);
              entitlementList.push(entitlement);
            });
            resolve(entitlementList);
          }
        });
    });
    return promise;
  }

  public getUnAssignEntitlementsByShop(shopId) {
    const entitlementList = [];
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpGet(SevConfig.MASTER_SEV, '/shop/unassignedEntitlements/' + shopId, {}, null)
        .then((data: any) => {
          if (data) {
            data.forEach((obj: any) => {
              const entitlement = this.masterDataObj.analyzeResponseEntitlement(obj);
              entitlementList.push(entitlement);
            });
            resolve(entitlementList);
          }
        });
    });
    return promise;
  }
  public getProductCategories(req) {
      const productCategories = [];
      const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPost(SevConfig.MASTER_SEV, '/category/findByCriteria',  req, null)
        .then((data: any) => {
          if (data) {
            data.data.forEach((obj: any) => {
              const category = this.masterDataObj.analyzeResponseCategory(obj);
              const statusAnalyzeObj: any = this.globalFun.getStatusObject(category.status, MainConfig.STATUS_LIST);
              category.statusName = statusAnalyzeObj.name;
              category.rowStyle.status = statusAnalyzeObj.style;
              category.shopTypeName = MainConfig.SHOP_TYPES[obj.shopTypeId];
              // category.shopCategoryName = MainConfig.SHOP_CATEGORIES[obj.shopCategoryId];
              category.dataTypeName = MainConfig.SHOP_DATA_TYPES[obj.dataType];
              // category.parentCategoryName = MainConfig.SHOP_CATEGORIES[obj.parentCategoryId];
              productCategories.push(category);
            });
            data.data = productCategories;
          }
          resolve(data);
        });
    });
    return promise;

  }
  public getBrands(req) {
    const brands = [];
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPost(SevConfig.MASTER_SEV, '/brand/findByCriteria',  req, null)
        .then((data: any) => {
          if (data) {
            data.data.forEach((obj: any) => {
              const brand = this.masterDataObj.analyzeResponseBrand(obj);
              const statusAnalyzeObj: any = this.globalFun.getStatusObject(brand.status, MainConfig.STATUS_LIST);
              brand.statusName = statusAnalyzeObj.name;
              brand.rowStyle.status = statusAnalyzeObj.style;
              brands.push(brand);
            });
            data.data = brands;
          }
          resolve(data);
        });
    });
    return promise;

  }
  public getMasterData(masterDataId: any) {
    const masterData = [];
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpGet(SevConfig.MASTER_SEV, '/customMasterData/' + masterDataId, {}, null)
        .then((data: any) => {
          if (data) {
            masterData.push(data[0]);
            resolve(masterData);
          } else {
            resolve(masterData);
          }
        });
    });
    return promise;
  }



}
