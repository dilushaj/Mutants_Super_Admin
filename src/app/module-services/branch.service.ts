import { Injectable } from '@angular/core';

import { MainConfig, SevConfig, ApiService, GlobalFunction } from './../shared';
import { Branch } from './../module-classes';

@Injectable()
export class BranchService {

  constructor( private apiSev : ApiService,
               private branchObj : Branch,
               private globalFun : GlobalFunction) { }

  public branchFindByCriteria (req : any){
    let formattedReq = this.branchObj.analyzeFindByCriteriaReq(req);
    const records : any = [];
    let promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPost(SevConfig.SHOP_SEV,"/branch/findByCriteria",formattedReq,null).then((data : any) => {
        if(data){
          data.data.forEach((obj : any) => {
            const row = this.branchObj.analyzeBranch(obj);
            const statusAnalyzeObj : any = this.globalFun.getStatusObject(row.status, MainConfig.STATUS_LIST);
            row.statusName = statusAnalyzeObj.name;
            row.rowStyle.statusName = statusAnalyzeObj.style;
            if(row.open){
              row.openName = "Open";
            }else{
              row.openName = "Closed";
            }
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

