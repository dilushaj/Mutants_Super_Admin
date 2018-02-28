import { Injectable } from '@angular/core';

import { MainConfig, SevConfig, ApiService, GlobalFunction } from './../shared';
import { MasterData } from './../module-classes';

@Injectable()
export class MasterDataService {

    constructor( private apiSev : ApiService,
                 private masterDataObj : MasterData,
                 private global : GlobalFunction) { }

    public get__ (data : any){

    }

}
