import { DateRange } from '../../common/date-range/date-range.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'sacchon-patient-avg-item',
  templateUrl: './patient-avg-item.component.html',
  styleUrls: ['./patient-avg-item.component.scss']
})
export class PatientAvgItemComponent implements OnInit {
  @Input() desc: string;
  @Input() value: string;
  @Input() unit: string;
  @Output() onChange: EventEmitter<DateRange> = new EventEmitter<DateRange>();

  changing: boolean;
  period: string;
  loading: boolean;
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.changing = false;
    this.loading = false;
    // get data for last 30 days
    const now = new Date();
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), now.getHours());
    this.onDateChange({start:monthAgo, end: null})
  }



  onDateChange({start,end}:DateRange) {
    console.log(start,end);
    if (!start && !end)
      this.period = 'of all time';
    else if (start && end)
      this.period = `from ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`
    else if (!end) {
      this.period = `in the last ${((Date.now() - start.getTime()) / 1000 / 3600 / 24) | 0} days`;
    }
    else if (!start) {
      this.period = `till ${end.toLocaleDateString()}`;
    }
    this.onChange.emit({start,end});
    this.changing = false;
  }
}
