import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { GlobalData, GlobalFunction, EntitlementConfig } from './../../shared';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

    private mainPath = '/admin/shop';
    private subPath = '';

    private tabList: any[] = [
        {
            title: 'Shop List',
            entitlements: ['VIEW_SHOP_PROFILE', 'UPDATE_SHOP_PROFILE'],
            active: false,
            route: '/admin/shop/details'
        },
        // {
        //     title: 'Business Info',
        //     entitlements: ['UPDATE_SHOP_PROFILE'],
        //     active: false,
        //     route: '/admin/shop/info'
        // }
    ];

    public tabs: any[] = [];

    constructor(private router: Router, private globalFn: GlobalFunction, private globalData: GlobalData) { }

    ngOnInit() {
        this.tabList.forEach((obj: any) => {
            if (this.globalFn.getEntitlementAvailability(EntitlementConfig.ENTITLEMENTS, this.globalData.authObject.entitlements, obj.entitlements).AT_LEAST_ONE){
                this.tabs.push(obj);
            }
        });
        if (this.tabs.length > 0) {
            this.subPath = this.tabs[0].route;
        }
        this.initRoute();
    }

    onSelectTab(tab: any){
        tab.active = true;
        this.router.navigate([tab.route]);
    }

    private initRoute(){
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    if (event.url === this.mainPath) {
                        this.router.navigate([this.subPath]);
                    }
                    this.activeTab();
                }
            });
        if (this.router.url === this.mainPath){
            this.router.navigate([this.subPath]);
        }else{
            this.activeTab();
        }
    }

    private activeTab() {
        for (const key in this.tabs) {
            if (this.router.url === this.tabs[key].route) {
                this.tabs[key].active = true;
                return true;
            }
        }
    }

}
