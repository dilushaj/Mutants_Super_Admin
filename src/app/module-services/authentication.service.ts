import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

import {MainConfig, SevConfig, ApiService, GlobalFunction} from './../shared';
import {Authentication, Branch} from './../module-classes';

@Injectable()
export class AuthenticationService {

  constructor (private apiSev: ApiService,
               private authObj: Authentication,
               private branchObj: Branch,
               private global: GlobalFunction) {
  }

  public getLoginResponse (data: any) {
    data.password = Md5.hashStr(data.password);
    const req = this.authObj.analyzeLoginRequest(data);
    console.log('converting password' + req.password);
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPut(SevConfig.ADMIN_SEV, '/login', req, null).then((response: any) => {
        if (response) {
          const analyzeRes = this.authObj.analyzeLoginResponse(response);
          const branchLength = response.branches.length;
          const branchList = [];
          for (let i = 0; i < branchLength; i++) {
            branchList.push(this.branchObj.analyzeBranch(response.branches[i]));
          }
          analyzeRes.branches = branchList;
          // console.log(analyzeRes);
          resolve(analyzeRes);
        } else {
          resolve(null);
        }
      }).catch(error => {
        resolve(null);
      });
    });
    return promise;
  }

  public checkLoginNameAvailablity (req) {
    const promise = new Promise((resolve, reject) => {
      return this.apiSev.httpPut(SevConfig.ADMIN_SEV, '/checkAvailability', req , null).then((data: any) => {
        resolve(data);
      }).catch(error => {
        resolve(null);
      });
    });
    return promise;
  }
}
