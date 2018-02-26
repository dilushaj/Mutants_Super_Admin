import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { EmitterService } from './emitter.service';
import { AppConfig } from './../config/index';
import { GlobalData } from './../data/global-data';

@Injectable()
export class ApiService {

  private WEB_API_URL = AppConfig.WEB_API_URL;

  constructor(private httpClient: HttpClient, private onEmit: EmitterService, private globalData : GlobalData) { }

  httpGet(sevConfig : any, path : string, body : any, header_value : any) {
    let promise = new Promise((resolve, reject) => {
      const httpHeaders = this.setHeader(header_value);
      const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
      return this.httpClient.get(url,{ headers: httpHeaders })
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          this.onEmit.broadcastHttpErrorEventEmitter(error);
          reject(error);
        });
    });
    return promise;
  }

  httpPost(sevConfig : any, path : string, body : any, header_value : any) {
    let promise = new Promise((resolve, reject) => {
      const req_body = JSON.stringify(body);
      const httpHeaders = this.setHeader(header_value);
      const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
      return this.httpClient.request("POST",url,{body:body,headers:httpHeaders})
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          this.onEmit.broadcastHttpErrorEventEmitter(error);
          reject(error);
        });
    });
    return promise;
  }

  httpPut(sevConfig : any, path : string, body : any, header_value : any) {
    let promise = new Promise((resolve, reject) => {
      const req_body = JSON.stringify(body);
      const httpHeaders = this.setHeader(header_value);
      const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
      return this.httpClient.request("PUT",url,{body:req_body,headers:httpHeaders})
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          this.onEmit.broadcastHttpErrorEventEmitter(error);
          reject(error);
        });
    });
    return promise;
  }

  private setHeader (header_value: any) {
    var header = new HttpHeaders().set('Content-Type', 'application/json');
    if(this.globalData.authObject.session){
      header = header.set('sessionid', this.globalData.authObject.session);
    }else{
      header = header.set('sessionid', "null");
    }
    if(header_value){
      for(var key in header_value){
        header = header.set(key, header_value[key]);
      }
    }
    return header;
  }

  private handleError (error: any) {
    return Observable.throw(error);
  }

}
