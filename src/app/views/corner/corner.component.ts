import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { GlobalData, GlobalFunction, EntitlementConfig } from './../../shared';

@Component({
  selector: 'app-corner',
  templateUrl: './corner.component.html',
  styleUrls: []
})
export class CornerComponent implements OnInit {

    private mainPath : string = "/admin/wfp";
    private subPath : string = "";
    public tabs : any[] = [];

    private tabList : any[] = [
        {
            title: 'Work Flow Points',
            entitlements: ["CREATE_SHOP_CORNER", "UPDATE_SHOP_CORNER", "UPDATE_SHOP_CORNER_STATUS", "VIEW_SHOP_CORNER_LIST"],
            active:false,
            route:"/admin/wfp/manage"
        }
    ];

    constructor(private router : Router, private globalFn : GlobalFunction, private globalData:GlobalData) { }

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
