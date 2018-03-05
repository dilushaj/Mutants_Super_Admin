import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: []
})
export class OrderViewComponent implements OnInit, OnChanges {
  @Input() formValue: any;
  @Input() action: string;
  @ViewChild('orderView') orderView: ModalDirective;
  displayValue: any = {};
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.displayValue = this.formValue;
  }

  onViewModel() {
    this.orderView.show();
  }
  onCloseOrderViewModal(): void {
    this.orderView.hide();
  }
}
