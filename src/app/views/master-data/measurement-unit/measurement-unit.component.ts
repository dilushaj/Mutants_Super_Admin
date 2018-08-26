import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '../../../module-services';
import {MasterDataManagementService } from '../../../module-services';
import { MasterData } from '../../../module-classes';
import * as CloneDeep from 'lodash/CloneDeep';
import { ToastNotificationService } from '../../../shared';

@Component({
  selector: 'app-measurement-unit',
  templateUrl: './measurement-unit.component.html',
  styleUrls: ['./measurement-unit.component.scss']
})
export class MeasurementUnitComponent implements OnInit {
  public masterDataId = 0;
  public masterData: any = {};
  public domains = [];
  public measurementUnits: any = [];
  public newMeasurement = '';
  constructor(
    private masterService: MasterDataService,
    private masterMngService: MasterDataManagementService,
    private masterObj: MasterData,
    private toastNot: ToastNotificationService
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
            this.masterData = CloneDeep(response[0]);
            if (typeof response[0].measurement_unit === 'undefined') {
              this.measurementUnits = [];
            } else {
              this.measurementUnits = response[0].measurement_unit;
            }
          } else {
            this.masterData = {};
            this.measurementUnits = [];
          }
        }
      });
    }
  }
  addMeasurementUnit() {
    this.measurementUnits.push(this.newMeasurement);
    this.newMeasurement = '';
  }

  removeMeasurementUnit(index) {
    this.measurementUnits.splice(index, 1);
  }

  onClickReset() {
    this.measurementUnits = CloneDeep(this.masterData.measurement_unit);
  }

  onClickSave() {
    if (typeof(this.masterData._id) === 'undefined') {
      const req = {
        'masterDataId': this.masterDataId,
        'measurement_unit': this.measurementUnits,
        'status': 2
      };
      this.masterMngService.addNewMasterData(req).then((response: any) => {
        if (response) {
          this.toastNot.toastSuccess('Master Data Succesfully Added');
          this.getMeasurementUnits(this.masterDataId);
        }
      });
    } else {
      const req = {
        'masterDataId': this.masterDataId,
        'measurement_unit': this.measurementUnits,
        'status': this.masterData.status,
        '_id': this.masterData._id
      };
      this.masterMngService.updateMasterData(req).then((response: any) => {
        if (response) {
          this.toastNot.toastSuccess('Master Data Successfully Updated');
        }
      });

    }
  }


}
