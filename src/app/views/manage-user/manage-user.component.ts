import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {EntitlementConfig, GlobalData, GlobalFunction} from '../../shared';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  private mainPath : string = "/admin/users";
  private subPath : string = "";

  private tabList : any[] = [
    {
      title: 'Users',
      entitlements: ["VIEW_USER_PROFILE", "UPDATE_USER_PROFILE"],
      active:false,
      route:"/admin/users/users"
    }
    // {
    //   title: 'Users Roles',
    //   entitlements: ["VIEW_USER_PROFILE", "UPDATE_USER_PROFILE"],
    //   active:false,
    //   route:"/admin/users/user-roles"
    // }
  ];

  public tabs: any[] = [];

  constructor(private router: Router, private globalFn: GlobalFunction, private globalData: GlobalData) { }

  ngOnInit() {
    this.tabList.forEach((obj : any) => {
      if(this.globalFn.getEntitlementAvailability(EntitlementConfig.ENTITLEMENTS, this.globalData.authObject.entitlements, obj.entitlements).AT_LEAST_ONE){
        this.tabs.push(obj);
      }
    });
    if(this.tabs.length > 0){
      this.subPath = this.tabs[0].route;
    }
    this.initRoute();
  }

  onSelectTab(tab : any){
    tab.active = true;
    this.router.navigate([tab.route]);
  }

  private initRoute(){
    this.router.events
      .subscribe((event) => {
        if(event instanceof NavigationEnd){
          //console.log('NavigationEnd:', event.url);
          if(event.url == this.mainPath){
            this.router.navigate([this.subPath]);
          }
          this.activeTab();
        }
      });
    if(this.router.url == this.mainPath){
      this.router.navigate([this.subPath]);
    }else{
      this.activeTab();
    }
  }

  private activeTab(){
    for(var key in this.tabs){
      if(this.router.url == this.tabs[key].route){
        this.tabs[key].active = true;
        return true;
      }
    }
  }
}
