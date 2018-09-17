import { Injectable } from '@angular/core';

import { MainConfig, SevConfig, ApiService, GlobalFunction } from './../shared';
import { MasterData } from './../module-classes';

@Injectable()
export class MasterDataManagementService {

  constructor (private apiSev: ApiService,
               private masterDataObj: MasterData,
               private global: GlobalFunction) {
  }

  public createEntitlements(req) {
    const formattedReq = this.masterDataObj.analyzeEntitlement(req);
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPost(SevConfig.MASTER_MANG_SEV, '/assignDomainEntitlement', formattedReq, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          }
        });
    });
    return promise;
  }

  public deleteEntitlements(req) {
    const formattedReq = this.masterDataObj.analyzeEntitlement(req);
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpDelete(SevConfig.MASTER_MANG_SEV, '/domain/entitlement', formattedReq, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          }
        });
    });
    return promise;
  }

  public addShopEntitlements(req) {
    const formattedReq = this.masterDataObj.analyzeShopEnt(req);
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPost(SevConfig.MASTER_MANG_SEV, '/assignShopEntitlement', formattedReq, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          }
        });
    });
    return promise;
  }

  public deleteShopEntitlements(req) {
    const formattedReq = this.masterDataObj.analyzeShopEnt(req);
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpDelete(SevConfig.MASTER_MANG_SEV, '/shop/entitlement', formattedReq, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          }
        });
    });
    return promise;
  }
  public updateCategoryStatus(req) {
      const promise = new Promise((resolve, reject) => {
        return this.apiSev.httpPut(SevConfig.MASTER_MANG_SEV, '/category/updateStatus', req, null)
          .then((data: any) => {
            if (data) {
              resolve(data);
            }
          });
      });
      return promise;
  }

  public updateBrandStatus(req) {
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPut(SevConfig.MASTER_MANG_SEV, '/brand/updateStatus', req, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          }
        });
    });
    return promise;
  }

  public addProductCategory(req) {
    const formattedReq = this.masterDataObj.analyzeRequestCategory(req);
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPost(SevConfig.MASTER_MANG_SEV, '/category', formattedReq, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          }
        });
    });
    return promise;

  }
  public updateProductCategory(req) {
    const formattedReq = this.masterDataObj.analyzeUpdateCategory(req);
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPut(SevConfig.MASTER_MANG_SEV, '/category', formattedReq, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          }
        }).catch(error => {
          resolve(null);
        });
    });
    return promise;
  }
  public addBrand(req) {
    const formattedReq = this.masterDataObj.analyzeRequestBrand(req);
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPost(SevConfig.MASTER_MANG_SEV, '/brand', formattedReq, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          }
        });
    });
    return promise;
  }
  public updateBrand(req) {
    const formattedReq = this.masterDataObj.analyzeUpdateBrand(req);
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPut(SevConfig.MASTER_MANG_SEV, '/brand', formattedReq, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          }
        }).catch(error => {
          resolve(null);
        });
    });
    return promise;
  }
  public addNewMasterData(req) {
      const promise = new Promise((resolve, reject) => {
        return this.apiSev.httpPost(SevConfig.MASTER_MANG_SEV, '/customMasterData', req, null)
          .then((data: any) => {
            if (data) {
              resolve(data);
            }
          });
      });
      return promise;
  }
  public updateMasterData(req) {
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPut(SevConfig.MASTER_MANG_SEV, '/customMasterData', req, null)
        .then((data: any) => {
          if (data) {
            resolve(data);
          }
        });
    });
    return promise;
  }
}
