import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sales-report-page',
  templateUrl: './sales-report-page.component.html',
  styleUrls: []
})
export class SalesReportPageComponent implements OnInit {

  private mainPath : string = "/reports/sales";
  private subPath : string = "/reports/sales/pending";

  tabs : any[] = [
    { title: 'Pending', active:false, route:"/reports/sales/pending" },
    { title: 'Approved', active:false, route:"/reports/sales/approved" },
    { title: 'Rejected', active:false, route:"/reports/sales/rejected" }
  ];

  constructor(private router : Router) { }

  ngOnInit() {
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
