import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';

import { GlobalData } from './../data/global-data';

@Injectable()
export class GuardService implements CanActivate{
  constructor(private router : Router, private globalData: GlobalData) { }

  canActivate(){
    try{
      let auth_response = localStorage.getItem('auth_object');
      if(auth_response !== null && JSON.parse(auth_response).isAuthorized){
        this.globalData.setAuthObject(JSON.parse(auth_response));
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
    localStorage.setItem('auth_object',JSON.stringify(response));
    this.router.navigate(['/dashboard']);
  }

  removeValidLogin(){
    localStorage.removeItem('auth_object');
    this.globalData.setAuthObject({});
    this.router.navigate(['/login']);
  }

}
