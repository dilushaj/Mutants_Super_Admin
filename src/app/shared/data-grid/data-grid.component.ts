import { Component, OnInit, Input, Output, ViewChildren, QueryList, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  @Input() gridConfig: any;

  @ViewChildren('FilterBoxList') FilterBoxList: QueryList<any>;

  @Output() onGridEvent: EventEmitter<any> = new EventEmitter();

  filter_box: any;

  constructor() { }

  ngOnInit() {
    //console.log(this.gridConfig);
    this.gridConfig.isCheckAll = false;
    this.resetColumnConfig();
  }

  onClickRecord(key,record : any){
    this.onGridEvent.emit({action:key,record:record});
  }

  onChangeCheckAll(){
    this.gridConfig.records.forEach((record: any) => {
      record.isCheck = this.gridConfig.isCheckAll;
    });
    this.onGridEvent.emit({action:"check",record:this.gridConfig.records});
  }

  onChangeCheckOne(){
    this.gridConfig.isCheckAll = true;
    for(let i = 0; i < this.gridConfig.records.length; i++){
      if(!this.gridConfig.records[i].isCheck){
        this.gridConfig.isCheckAll = false;
        break;
      }
    }
    this.onGridEvent.emit({action:"check",record:this.gridConfig.records});
  }

  onClickSort(column){
    let value = column.sortConfig.value;
    this.resetSortConfig();
    switch(value) {
      case 'none': {
        column.sortConfig.value = 'asc';
        break;
      }
      case 'asc': {
        column.sortConfig.value = 'desc';
        break;
      }
      case 'desc': {
        column.sortConfig.value = 'asc';
        break;
      }
      default: {
        column.sortConfig.value = 'none';
        break;
      }
    }
    column.sorted = true;
    //console.log(column.sortConfig);
    this.onGridEvent.emit({action:"sort",record:column.sortConfig});
  }

  onClickOpenFilter(column: any){
    this.closeAllFilterPanel();
    column.isOpen = !column.isOpen;
  }

  onClickFilter($event,column){
    var array = this.getFilteredObject();
    //console.log(array);
    this.onGridEvent.emit({action:"filter",record:array});
    this.toggleDropdown($event,column);
  }

  onClickFilterClear($event,column){
    if(typeof column.filterConfig === 'object'){
      column.filterConfig.value = "";
    }
    var array = this.getFilteredObject();
    //console.log(array);
    this.onGridEvent.emit({action:"filter",record:array});
    this.toggleDropdown($event,column);
  }

  onPageChange($event){
    //console.log($event);
    this.onGridEvent.emit({action:"pageChange",record:{
        page : $event.page,
        itemsPerPage : this.gridConfig.pagination.itemsPerPage,
      }
    });
  }

  onPageClick(){
    //this.onGridEvent.emit({action:"pageChange",record:{
    //  page : this.gridConfig.pagination.bigCurrentPage,
    //  itemsPerPage : this.gridConfig.pagination.itemsPerPage,
    //}});
  }

  onClickRefresh(){
    this.gridConfig.isCheckAll = false;
    this.onChangeCheckAll();
    this.resetColumnConfig();
    this.resetSortConfig();
    this.onGridEvent.emit({action:"refresh",record:{}});
  }

  @HostListener('document:click', ['$event']) clickout(event) {
    this.filter_box = this.FilterBoxList;
    for(let i = 0; i<this.filter_box._results.length; i++){
      if(this.filter_box._results[i].nativeElement.contains(event.target)) {
        //console.log("clicked inside");
        return false;
      }
    }
    this.closeAllFilterPanel();
  }

  private getFilteredObject(): any{
    var filterArray = [];
    this.gridConfig.columns.forEach((column: any) => {
      column.filtered = false;
      if(typeof column.filterConfig === 'object' && typeof column.filterConfig.value !== "undefined" && column.filterConfig.value !== ""){
        filterArray.push({"key": column.key, "operators": column.filterConfig.selected_operator, "value": column.filterConfig.value});
        column.filtered = true;
      }
    });
    return filterArray;
  }

  private toggleDropdown($event: MouseEvent, column: any): void {
    $event.preventDefault();
    $event.stopPropagation();
    column.isOpen = !column.isOpen;
  }

  private change(value: boolean, column: any): void {
    column.isOpen = value;
  }

  private closeAllFilterPanel(): void {
    try {
      this.gridConfig.columns.forEach((column: any) => {
        column.isOpen = false;
      });
    } catch (e) {}
  }

  private resetColumnConfig(){
    this.gridConfig.columns.forEach((column: any) => {
      column.sorted = false;
      column.filtered = false;
      column.isOpen = false;
      column.sortConfig = {"key": column.key, "value": "none"};
      if(typeof column.filterConfig === 'object' && column.filterConfig.type === 'option'){
        column.filterConfig.value = "";
      }
    });
  }

  private resetSortConfig(){
    this.gridConfig.columns.forEach((column: any) => {
      column.sorted = false;
      column.sortConfig = {
        "key": column.key,
        "value": "none"
      };
    });
  }

}
