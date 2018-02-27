import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest } from '@angular/common/http';
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
        var header = new HttpHeaders().set('Content-Type', 'application/json');
        const httpHeaders = this.setHeader(header, header_value);
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
        var header = new HttpHeaders().set('Content-Type', 'application/json');
        const httpHeaders = this.setHeader(header, header_value);
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
        var header = new HttpHeaders().set('Content-Type', 'application/json');
        const httpHeaders = this.setHeader(header, header_value);
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

    httpPostFile(sevConfig : any, path : string, body : any, header_value : any) {
        let promise = new Promise((resolve, reject) => {
            var header = new HttpHeaders();
            const httpHeaders = this.setHeader(header, header_value);
            const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
            const formData: FormData = new FormData();
            for(var key in body){
                formData.append(key, body[key]);
            }
            return this.httpClient.request("POST",url,{body:formData,headers:httpHeaders})
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

    httpPostFile__0(sevConfig : any, path : string, body : any, header_value : any) {
        let promise = new Promise((resolve, reject) => {
            var header = new HttpHeaders();
            const httpHeaders = this.setHeader(header, header_value);
            const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
            const formData: FormData = new FormData();
            for(var key in body){
                formData.append(key, body[key]);
            }
            const request = new HttpRequest(
                "POST", url, formData, {headers : httpHeaders,reportProgress: true});
            return this.httpClient.request(request)
                .subscribe((response : any) => {
                    switch (response.type) {
                        // handle the upload progress event received
                        case HttpEventType.UploadProgress:
                            //console.log("UploadProgress");
                            var progress = Math.round(100 * response.loaded / response.total)
                            break;
                        // handle the download progress event received
                        case HttpEventType.DownloadProgress:

                            break;
                        // handle the response event received
                        case HttpEventType.Response:
                            // When getting the full response body
                            //console.log("Response");
                            resolve(response);
                            break;
                    }
                }, error => {
                    //console.log(error);
                    this.onEmit.broadcastHttpErrorEventEmitter(error);
                    reject(error);
                }, () => {
                    //console.log("On Completed");
                    resolve(null);
                });
        });
        return promise;
    }

  private setHeader (header : any,header_value: any) {
    //var header = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    if(this.globalData.authObject.sessionId){
      header = header.set('sessionid', this.globalData.authObject.sessionId);
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

    private getEventMessage (error: any) {
    console.log(error)
  }

}
