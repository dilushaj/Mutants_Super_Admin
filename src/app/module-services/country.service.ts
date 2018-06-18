import {Injectable} from '@angular/core';
import {ApiService, GlobalData, GlobalFunction, MainConfig, SevConfig} from '../shared';
import {Country} from '../module-classes';


@Injectable()
export class CountryService {

  constructor(private apiSev: ApiService,
              private countryObj: Country,
              private globalFun: GlobalFunction,
              private globalData: GlobalData) {}


  public getCountryList (){
    const records : any = [];
    let promise = new Promise((resolve, reject) => {
      return this.apiSev.httpGet(SevConfig.MASTER_SEV,"/countries",{},null).then((data : any) => {
        if(data){
          data.forEach((obj : any) => {
            const row = this.countryObj.analyzeCountry(obj);
            records.push(row);
          });
          data = records;
        }
        resolve(data);
      }).catch(error => {
        resolve(null);
      });
    });
    return promise;
  }

}
