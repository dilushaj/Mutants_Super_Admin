import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription'

import {
    GuardService,
    WebsocketsService,
    EmitterService,
    ToastNotificationService,
    GlobalData,
    AppConfig,
    GlobalFunction,
    EntitlementConfig
} from './shared';

import { navigation } from './_nav';

@Component({
    selector: 'body',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    private socketSubscription:Subscription;
    private navigation : any = navigation || [];

    constructor(private translate:TranslateService,
                private router:Router,
                private guard:GuardService,
                private socket:WebsocketsService,
                private onEmit:EmitterService,
                private vcr:ViewContainerRef,
                private toastNot:ToastNotificationService,
                private globalFn : GlobalFunction,
                private globalData:GlobalData) {
        translate.addLangs(['en']);
        //translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa']);
        translate.setDefaultLang('en');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en/) ? browserLang : 'en');
        //translate.use(browserLang.match(/en|fr|ur|es|it|fa/) ? browserLang : 'en');

        toastNot.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.guard.canActivate();
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        let url = ['/login', '/register'];
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    //console.log('NavigationStart:', event.url);
                    if (url.indexOf(event.url) === -1) {
                        //this.guard.canActivate();
                        if(!this.globalData.authObject.isAuthorized){
                            this.router.navigate(['/login']);
                            return false;
                        }
                    }
                }
            });

        if(this.globalData.authObject.isAuthorized){
            this.analyzeNavigation();
        }
        //this.socketInit();
        this.openHttpErrorEvent();
        this.openLoginSucceedEvent();
        //this.globalData.setSystemConfigObject(AppConfig.SYSTEM_CONFIG);
    }

    private openLoginSucceedEvent() {
        this.onEmit.loginSucceedEventEmitter.subscribe((response:any) => {
            this.analyzeNavigation();
        });
    }

    private openHttpErrorEvent() {
        this.onEmit.httpErrorEventEmitter.subscribe(
            (response:any) => {
                //console.log(response);
                this.toastNot.setRootViewContainerRef(this.vcr);
                switch (response.status) {
                    case -1:
                        this.toastNot.toastError('Service not working.');
                        break;
                    case 0:
                        this.toastNot.toastError('Service not working.');
                        break;
                    case 304:
                        var eTag = response.headers.get('Etag');
                        if (eTag) {
                            var res = eTag.replace(/"/g, "");
                            this.toastNot.toastWarning(res);
                        }
                        break;
                    case 401:
                        this.toastNot.toastInfo('Unauthorized. Invalid user.');
                        //ssoAuth.logOut();
                        break;
                    case 404:
                        this.toastNot.toastError('404 Not Found.');
                        break;
                    case 400:
                        this.toastNot.toastError('Bad Request.');
                        break;
                    case 500:
                        this.toastNot.toastError('System Error.');
                        break;
                    default:
                        break;
                }
            }
        );
    }

    private analyzeNavigation(){
        let menuList : any = [];
        let childrenList : any = [];
        this.navigation.forEach((obj : any) => {
            if(obj.menu){
                if(obj.children){
                    childrenList = [];
                    obj.children.forEach((childrenObj : any) => {
                        if(this.globalFn.getEntitlementAvailability(EntitlementConfig.ENTITLEMENTS, this.globalData.authObject.entitlements, childrenObj.entitlements).AT_LEAST_ONE){
                            childrenList.push(childrenObj);
                        }
                    });
                    if(childrenList.length > 0){
                        obj.children = childrenList;
                        menuList.push(obj);
                    }
                }else{
                    if(this.globalFn.getEntitlementAvailability(EntitlementConfig.ENTITLEMENTS, this.globalData.authObject.entitlements, obj.entitlements).AT_LEAST_ONE){
                        menuList.push(obj);
                    }
                }
            }else{
                menuList.push(obj);
            }
        });
        //console.log(menuList);
        this.globalData.setNavigationMenu(menuList);
    }

    socketInit() {
        this.socket.connect()

        this.socketSubscription = this.socket.messages.subscribe((message:string) => {
            console.log('received message from server: ', message);
        });
        // send message to server, if the socket is not connected it will be sent
        // as soon as the connection becomes available thanks to QueueingSubject
        this.socket.send('hello');
    }

    /*changeLang() {
     this.translate.use('en');
     this.translate.get('Dashboard').subscribe((res: string) => {
     console.log(res)
     });}*/

}
