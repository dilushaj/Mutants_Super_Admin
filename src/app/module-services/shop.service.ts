import { Injectable } from '@angular/core';

import { MainConfig, SevConfig, ApiService, GlobalFunction } from './../shared';
import { Shop } from './../module-classes';

@Injectable()
export class ShopService {

    constructor( private apiSev : ApiService,
                 private shopObj : Shop,
                 private globalFun : GlobalFunction) { }

    public shopFindByCriteria (req : any){
        let formattedReq = this.shopObj.analyzeFindByCriteriaReq(req);
        const records : any = [];
        let promise = new Promise((resolve, reject) => {
            return this.apiSev.httpPost(SevConfig.SHOP_SEV,"/shop/findByCriteria",formattedReq,null).then((data : any) => {
                //console.log(data);
                if(data){
                    data.data.forEach((obj : any) => {
                        const row = this.shopObj.analyzeShop(obj);
                        const statusAnalyzeObj : any = this.globalFun.getStatusObject(row.status, MainConfig.STATUS_LIST);
                        row.statusName = statusAnalyzeObj.name;
                        row.rowStyle.statusName = statusAnalyzeObj.style
                        records.push(row);
                    });
                    data.data = records;
                }
                resolve(data);
            }).catch(error => {
                resolve(null);
            });
        });
        return promise;
    }

}
