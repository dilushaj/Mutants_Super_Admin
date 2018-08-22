import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

// Import 3rd party components
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

//import websocketConnect from 'rxjs-websockets'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

export function HttpLoaderFactory(http: HttpClient) {
  // for development
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
];

// Import module-services
import {
    AuthenticationService,
    MasterDataService,
    ShopService,
    CornerService,
    BranchService,
    UsersService,
    UserRolesService,
    CountryService,
    MasterDataManagementService

} from './module-services';

const APP_MODULE_SERVICES = [
    AuthenticationService,
    MasterDataService,
    ShopService,
    CornerService,
    BranchService,
    UsersService,
    UserRolesService,
    CountryService,
    MasterDataManagementService
];

// Import module-classes
import {
    Authentication,
    Shop,
    MasterData,
    Branch,
    Corner,
    Users,
    UserRoles,
    Country
} from './module-classes';

const APP_MODULE_CLASSES = [
    Authentication,
    Shop,
    MasterData,
    Branch,
    Corner,
    Users,
    UserRoles,
    Country
];

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
];

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
];

// Import shared
import {
  GuardService,
  EmitterService,
  ApiService,
  ToastNotificationService,
  WebsocketsService,
  GlobalData,
  GlobalFunction
} from './shared';

const APP_SHARED = [
  GuardService,
  EmitterService,
  ApiService,
  ToastNotificationService,
  WebsocketsService,
  GlobalData,
  GlobalFunction
];

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ToastModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  providers: [
    ...APP_SHARED,
    ...APP_MODULE_SERVICES,
    ...APP_MODULE_CLASSES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
