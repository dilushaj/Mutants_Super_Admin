import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

import { MainConfig, SevConfig, ApiService, GlobalFunction } from './../shared';
import { Authentication, Branch } from './../module-classes';

@Injectable()
export class AuthenticationService {

    constructor( private apiSev : ApiService,
                 private authObj : Authentication,
                 private branchObj : Branch,
                 private global : GlobalFunction) { }

    public getLoginResponse (data : any){
        data.password = Md5.hashStr(data.password);
        let req = this.authObj.analyzeLoginRequest(data);
        let promise = new Promise((resolve, reject) => {
            return this.apiSev.httpPut(SevConfig.ADMIN_SEV,"/login",req,null).then((response : any) => {
                if(response){
                    let analyzeRes = this.authObj.analyzeLoginResponse(response);
                    let branchLength = response.branches.length;
                    let branchList = [];
                    for(let i = 0; i < branchLength; i++){
                        branchList.push(this.branchObj.analyzeBranch(response.branches[i]));
                    }
                    analyzeRes.branches = branchList;
                    //console.log(analyzeRes);
                    resolve(analyzeRes);
                }else{
                    resolve(null);
                }
            }).catch(error => {
                resolve(null);
            });
        });
        return promise;
    }

}
