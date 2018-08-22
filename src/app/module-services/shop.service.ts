import {Injectable} from '@angular/core';

import {MainConfig, SevConfig, ApiService, GlobalFunction} from './../shared';
import {Shop} from './../module-classes';

@Injectable()
export class ShopService {

  constructor (private apiSev: ApiService,
               private shopObj: Shop,
               private globalFun: GlobalFunction) {
  }

  public createShop (req: any) {
    const formattedReq = this.shopObj.analyzeNewShop(req);
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPost(SevConfig.SHOP_SEV, '', formattedReq, null).then((data: any) => {
        if (data) {
          console.log('Succesfully added Shop');
        }
        resolve(data);
      }).catch(error => {
        resolve(null);
      });
    });
    return promise;
  }

  public getShopChatogories () {
    const chatogories = [];
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpGet(SevConfig.MASTER_SEV, '/shopCategories', {}, null)
        .then((data: any) => {
          if (data) {
            data.forEach((obj: any) => {
              const category = this.shopObj.analyzeShopCatogory(obj);
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

  public getShopList (req) {
    const formattedReq = this.shopObj.analyzeFindByCriteriaReq(req);
    const shopList = [];
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPost(SevConfig.SHOP_SEV, '/shop/all/findByCriteria', formattedReq, null)
        .then((data: any) => {
          if (data) {
            data.data.forEach((obj: any) => {
              const shop = this.shopObj.analyzeShop(obj);
              const statusAnalyzeObj: any = this.globalFun.getStatusObject(shop.status, MainConfig.STATUS_LIST);
              shop.statusName = statusAnalyzeObj.name;
              shop.rowStyle.status = statusAnalyzeObj.style;
              shopList.push(shop);
            });
            data.data = shopList;
          }
          resolve(data);
        }).catch(error => {
          resolve(null);
        });

    });
    return promise;
  }
  public updateShopStatus(req) {
   const promise = new Promise((resolve, reject) => {
        return this.apiSev.httpPut(SevConfig.SHOP_SEV, '/updateStatus', req, null)
          .then((data: any) => {
            if (data) {
              resolve(data);
            }
          });
   });
  return promise;
  }
}
