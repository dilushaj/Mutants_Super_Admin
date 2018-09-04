import {Injectable} from '@angular/core';
import {ApiService, GlobalData, GlobalFunction, MainConfig, SevConfig} from '../shared';
import {UserRoles} from '../module-classes';


@Injectable()
export class UserRolesService {

  constructor( private apiSev : ApiService,
               private userRolesObj : UserRoles,
               private globalFun : GlobalFunction,
               private globalData : GlobalData) { }

  public getUserRoles (){
    const records : any = [];
    let promise = new Promise((resolve, reject) => {
      return this.apiSev.httpGet(SevConfig.ROLE_SEV,'/' + this.globalData.authObject.shopId + '/' + this.globalData.authObject.branchId ,{},null).then((data : any) => {
        if(data){
          data.forEach((obj : any) => {
            const row = this.userRolesObj.analyzeUserRoles(obj);
            records.push(row);
          });
          data = records;
        }
        resolve(data);
      }).catch(error => {
        resolve(null);
      });
    });
    return promise;
  }

}
