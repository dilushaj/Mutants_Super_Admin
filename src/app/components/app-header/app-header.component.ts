import { Component, OnInit, ViewChild } from '@angular/core';

import { GuardService, GlobalData, SevConfig, ApiService } from './../../shared';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

  private user : any = {};
  countryList : any = [];
  formValue : any = {};
  formAction : string = "add";

  constructor(private guard: GuardService, public globalData: GlobalData, private apiSev : ApiService) { }

  ngOnInit() {
    //console.log(this.publicData.LoginResponse);
  }

  onLogOut(){
    this.guard.removeValidLogin();
  }

  onClickProfile(){

  }

  onClickChangePassword(){

  }

}
