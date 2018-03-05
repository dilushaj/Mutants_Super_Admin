import {Injectable} from '@angular/core';
import {ApiService, GlobalData, GlobalFunction, MainConfig, SevConfig} from '../shared';
import {Users} from '../module-classes';


@Injectable()
export class UsersService {

  constructor( private apiSev : ApiService,
               private userObj : Users,
               private globalFun : GlobalFunction,
               private globalData : GlobalData) { }

  public cornerFindByCriteria (req : any){
    let formattedReq = this.userObj.analyzeFindByCriteriaReq(req);
    const records : any = [];
    let promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPost(SevConfig.ADMIN_SEV,"/admin/findByCriteria",formattedReq,null).then((data : any) => {
        if(data){
          data.data.forEach((obj : any) => {
            const row = this.userObj.analyzeCorner(obj);
            for(var key in this.globalData.domainProperty.CORNER){
              if(this.globalData.domainProperty.CORNER[key].ID == row.type){
                row.typeName = this.globalData.domainProperty.CORNER[key].NAME;
                break;
              }
            }
            if(row.superAdmin) {
              row.superAdminName = 'Yes';
            }else {
              row.superAdminName = 'No';
            }
            const statusAnalyzeObj: any = this.globalFun.getStatusObject(row.status, MainConfig.STATUS_LIST);
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