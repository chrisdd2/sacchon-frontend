import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { end } from '@popperjs/core';


@Component({
  selector: 'sacchon-avg-item',
  templateUrl: './avg-item.component.html',
  styleUrls: ['./avg-item.component.scss']
})
export class AvgItemComponent implements OnInit {
  @Input() desc:string;
  @Input() value:string;
  @Input() unit:string;
  @Output() onChange:EventEmitter<Date[]> = new EventEmitter<Date[]>();

  changing:boolean;
  period:string;
  loading:boolean;



  constructor() { }

  ngOnInit(): void {
    this.changing=false;
    this.loading=false;
    this.onSubmit(new Date(Date.now()-30*1000*3600*24),null)
  }

  onSubmit(start:Date,end:Date){
    if(!start && !end)
      this.period ='of all time';
    else if(start && end )
      this.period = `from ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`
    else if (!end ){
      this.period = `in the last ${((Date.now()-start.getTime())/1000/3600/24) | 0} days`;
    }
    else if(!start){
      this.period =`till ${end.toLocaleDateString()}`;
    }
    this.onChange.emit([start,end]);
    this.changing=false;
  }
}
