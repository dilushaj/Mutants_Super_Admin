import { Injectable } from '@angular/core';

import { MainConfig, SevConfig, ApiService, GlobalFunction, GlobalData } from './../shared';
import { Corner } from './../module-classes';

@Injectable()
export class CornerService {

    constructor( private apiSev : ApiService,
                 private cornerObj : Corner,
                 private globalFun : GlobalFunction,
                 private globalData : GlobalData) { }

    public cornerFindByCriteria (req : any){
        let formattedReq = this.cornerObj.analyzeFindByCriteriaReq(req);
        const records : any = [];
        let promise = new Promise((resolve, reject) => {
            return this.apiSev.httpPost(SevConfig.SHOP_SEV,"/corner/findByCriteria",formattedReq,null).then((data : any) => {
                //console.log(data);
                if(data){
                    data.data.forEach((obj : any) => {
                        const row = this.cornerObj.analyzeCorner(obj);
                        for(var key in this.globalData.domainProperty.CORNER){
                            if(this.globalData.domainProperty.CORNER[key].ID == row.type){
                                row.typeName = this.globalData.domainProperty.CORNER[key].NAME;
                                break;
                            }
                        }
                        const statusAnalyzeObj : any = this.globalFun.getStatusObject(row.status, MainConfig.STATUS_LIST);
                        //console.log(statusAnalyzeObj)
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
