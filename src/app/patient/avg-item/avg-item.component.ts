import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


function dateLimitValidator(limit: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == '') // empty date
      return null;
    if (Date.parse(control.value) > limit)
      return { 'dateLimit': true };
    return null;
  };
}
function dateRangeValidator(a: string, b: string) {
  return (fg: FormGroup): ValidationErrors => {
    const start = fg.get(a).value;
    const end = fg.get(b).value;
    if (start == '' || end == '')
      return null;
    if (Date.parse(start) > Date.parse(end))
      return { dateRange: true };
    return null;
  }
}

@Component({
  selector: 'sacchon-avg-item',
  templateUrl: './avg-item.component.html',
  styleUrls: ['./avg-item.component.scss']
})
export class AvgItemComponent implements OnInit {
  @Input() desc: string;
  @Input() value: string;
  @Input() unit: string;
  @Output() onChange: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  changing: boolean;
  period: string;
  loading: boolean;
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      date_start: [[dateLimitValidator(Date.now())]],
      date_end: [, [dateLimitValidator(Date.now())]]
    }, { validator: dateRangeValidator('date_start', 'date_end') } );
    this.changing = false;
    this.loading = false;
    // get data for last 30 days
    const now = new Date();
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), now.getHours());
    this.onSubmit(monthAgo, null)
  }



  onSubmit(start: Date, end: Date) {
    this.form.errors
    if( this.form.invalid) 
      return;
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
    this.onChange.emit([start, end]);
    this.changing = false;
  }
}
