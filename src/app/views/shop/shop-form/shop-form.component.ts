import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { catchError, map, debounceTime, switchMap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

import { AppConfig, MainConfig, SevConfig, ApiService, GlobalFunction, GlobalData } from './../../../shared';

@Component({
    selector: 'app-shop-form',
    templateUrl: './shop-form.component.html',
    styleUrls: []
})
export class ShopFormComponent implements OnInit {

    public shopDetail : any = {};
    public fileUploadConfig : any = {};

    cities = [];
    selectedCityId: any;

    typeahead = new EventEmitter<string>();

    constructor(public bsModalRef: BsModalRef,
                private modalService: BsModalService,
                private apiSev : ApiService,
                private globalData: GlobalData,
                private cd: ChangeDetectorRef) {
        this.typeahead
            .pipe(switchMap(term => this.loadGithubUsers(term)))
            .subscribe(items => {
                this.cities = items;
            }, (err) => {
                this.cities = [];
                console.log('error', err);
            });
    }

    loadGithubUsers(term: string){
        console.log(term);
        let promise = new Promise((resolve, reject) => {
            resolve([
                {id: 1, name: 'Vilnius'},
                {id: 2, name: 'Kaunas'},
                {id: 3, name: 'Pabrad?'}
            ]);
        });
        return promise;
    }

    ngOnInit() {
        this.fileUploadConfig = {
            "width" : 200,
            "height" : 150,
            "shopId" : this.globalData.authObject.shopId,
            "type" : "shop",
            "imgUrl" : AppConfig.IMAGE_URL
        };
        setTimeout(()=>{
            console.log(this.shopDetail);
        },0);
    }

    onCloseModal(){
        let response : any = this.shopDetail;
        this.modalService.setDismissReason(response);
        this.bsModalRef.hide();
    }

    onFileUploadEvent($event){
        console.log($event);
    }

    onNgSelectKeyUp($event){
        console.log($event)
    }
}
