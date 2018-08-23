import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../../../module-services';
import {MasterDataManagementService } from '../../../module-services';
import { MasterData } from '../../../module-classes';

@Component({
  selector: 'app-measurement-unit',
  templateUrl: './measurement-unit.component.html',
  styleUrls: ['./measurement-unit.component.scss']
})
export class MeasurementUnitComponent implements OnInit {
  public masterData= {};
  public domains = [];
  public measurementUnits = [];
  public newMeasurement = '';
  constructor(
    private masterService: MasterDataService,
    private masterMngService: MasterDataManagementService,
    private masterObj: MasterData
  ) { }

  ngOnInit() {
    this.getMasterDataCategories();
  }
  private getMasterDataCategories () {
    this.masterService.getShopCategories().then((response: any) => {
      if (response) {
        this.domains = response;
        console.log('Master Data successfully taken');
      } else {
        console.log('Error occured');
      }
    });
  }
  getMeasurementUnits(masterDataId) {
    this.measurementUnits = [];
    if (masterDataId !== null) {
      this.masterService.getMasterData(masterDataId).then((response: any) => {
        if (response) {
          if (response.length !== 0) {
            this.masterData = response[0];
            this.measurementUnits = response[0].measurement_unit;
          }
        } else {
          this.masterData = {};
          this.measurementUnits = [];
        }
      });
    }
  }


}
