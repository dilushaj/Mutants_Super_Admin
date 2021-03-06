import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';

import { GlobalData } from './../data/global-data';

@Injectable()
export class GuardService implements CanActivate{
  constructor(private router : Router, private globalData: GlobalData) { }

  canActivate(){
    try{
      let auth_object = localStorage.getItem('auth_object_pk');
      if(auth_object !== null && JSON.parse(auth_object).isAuthorized){
        this.globalData.setAuthObject(JSON.parse(auth_object));
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    }catch(e){
      this.router.navigate(['/login']);
      return false;
    }
  }

  createAuthSession(response : any){
    response.isAuthorized = true;
    this.globalData.setAuthObject(response);
    localStorage.setItem('auth_object_pk',JSON.stringify(response));
    this.router.navigate(['/dashboard']);
  }

  removeValidLogin(){
    localStorage.removeItem('auth_object_pk');
    this.globalData.setAuthObject({});
    this.router.navigate(['/login']);
  }

}
