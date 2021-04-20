import { Component, Input, OnInit, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface FieldTableDefinitions{
  name:string;
  label:string;
  value(v:any):any;
}

@Component({
  selector: 'sacchon-patient-fieldtable',
  templateUrl: './patient-fieldtable.component.html',
  styleUrls: ['./patient-fieldtable.component.scss']
})
export class PatientFieldtableComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator:MatPaginator;

  @Output() onAdd: EventEmitter<void> = new EventEmitter();
  @Output() onLoadMore: EventEmitter<void> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Input() hasAdd:boolean=true;
  @Input() hasDelete:boolean=true;
  @Input() hasEdit:boolean=true;
  @Input() hasReached:boolean;
  @Input() hasActions:boolean=true;
  @Input() definitions:FieldTableDefinitions[];
  @Input() records : MatTableDataSource<any>;

  displayedColumns:string[];

  ngAfterViewInit() {
    this.records.paginator = this.paginator;
  }
  constructor() { }

  ngOnInit(): void {
    this.displayedColumns=[];
    for( let def of this.definitions )
      this.displayedColumns.push(def.name);
    if( this.hasActions)
      this.displayedColumns.push("actions");
  }

}
