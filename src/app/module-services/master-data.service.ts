import { Injectable } from '@angular/core';

import { MainConfig, SevConfig, ApiService, GlobalFunction } from './../shared';
import { MasterData } from './../module-classes';

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
              resolve(data);
            }
          });
      });
      return promise;
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



}
