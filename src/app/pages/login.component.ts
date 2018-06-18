import { Component, OnInit } from '@angular/core';
import { NgForm,FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { GuardService, EmitterService, GlobalData } from '../shared';
import { AuthenticationService } from '../module-services';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{

  questions : any = [];
  loginReq : any = {};
  forgotPasswordReq : any = {};
  form: FormGroup;

  constructor(private guard : GuardService,
              private onEmit: EmitterService,
              private authSev : AuthenticationService,
              private router:Router,
              private globalData:GlobalData,private fb: FormBuilder) { }

  isLoginForm : boolean = true;

  ngOnInit() {
   //this.form = new FormGroup();
    this.questions = [
      {
        "value":"Bombasto",
        "key":"firstName",
        "label":"First name",
        "required":true,
        "order":1,
        "controlType":"textbox",
        "type":""
      },
      {
        "key":"emailAddress",
        "label":"Email",
        "required":false,
        "order":2,
        "controlType":"textbox",
        "type":"email"
      },
      {
        "value":{
          "key":"solid",
          "value":"Solid"
        },
        "key":"brave",
        "label":"Bravery Rating",
        "required":true,
        "order":3,
        "controlType":"dropdown",
        "options":[
          {
            "key":"",
            "value":"null"
          },{
            "key":"solid",
            "value":"Solid"
          },
          {
            "key":"great",
            "value":"Great"
          },
          {
            "key":"good",
            "value":"Good"
          },
          {
            "key":"unproven",
            "value":"Unproven"
          }
        ]
      }
    ];



    let group: any = {};
    //this.questions.forEach((question : any) => {
    //  group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
    //    : new FormControl(question.value || '');
    //});

    //console.log(group)
    //this.form = new FormGroup(group);

    this.questions.forEach((question : any) => {
      group[question.key] = [question.value || '', question.required ? Validators.required : false];
    });
    this.form = this.fb.group(group);

      if(this.globalData.authObject.isAuthorized){
          this.router.navigate(['/']);
          return false;
      }
  }

  isValid(question) { return this.form.controls[question.key].valid; }

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
