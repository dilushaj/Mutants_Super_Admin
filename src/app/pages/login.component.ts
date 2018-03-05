import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { GuardService, EmitterService, GlobalData } from '../shared';
import { AuthenticationService } from '../module-services';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{

  loginReq : any = {};
  forgotPasswordReq : any = {};

  constructor(private guard : GuardService,
              private onEmit: EmitterService,
              private authSev : AuthenticationService,
              private router:Router,
              private globalData:GlobalData) { }

  isLoginForm : boolean = true;

  ngOnInit() {
      if(this.globalData.authObject.isAuthorized){
          this.router.navigate(['/']);
          return false;
      }
  }

  onLoggedIn(form: NgForm) {
    if(form.valid){
      let req = Object.assign({},form.value);
        this.authSev.getLoginResponse(req).then((response : any) => {
            //console.log(response);
            if(response){
                this.guard.createAuthSession(response);
                this.onEmit.broadcastLoginSucceedEventEmitter(null);
            }
        });
    }
  }

  onSubmitForgotPassword(form: NgForm) {

  }

}
