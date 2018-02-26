import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GuardService } from '../shared';
import { AuthenticationService } from '../module-services';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{

  loginReq : any = {};
  forgotPasswordReq : any = {};

  constructor(private guard : GuardService, private authSev : AuthenticationService) { }

  isLoginForm : boolean = true;

  ngOnInit() {

  }

  onLoggedIn(form: NgForm) {
    if(form.valid){
      let req = Object.assign({},form.value);
        this.authSev.getLoginResponse(req).then((response : any) => {
            //console.log(response);
            if(response){
                this.guard.createAuthSession(response);
            }
        });
    }
  }

  onSubmitForgotPassword(form: NgForm) {

  }

}
