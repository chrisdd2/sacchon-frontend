import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';


export function dateLimitValidator(limit: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == '') // empty date
      return null;
    if (Date.parse(control.value) > limit)
      return { dateLimit: true };
    return null;
  };
}
export function dateRangeValidator(a: string, b: string) {
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

export type DateRange = { start: Date, end: Date }


@Component({
  selector: 'sacchon-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  form: FormGroup;
  @Output() onChange: EventEmitter<DateRange> = new EventEmitter<DateRange>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      start: new FormControl(null, dateLimitValidator(Date.now())),
      end: new FormControl(null, dateLimitValidator(Date.now()))
    }, dateRangeValidator('start', 'end'));
  }

  onSave() {
    if (this.form.invalid)
      return;
    let [start, end] = [this.form.controls.start.value, this.form.controls.end.value];
    start = start == '' || !start ? null : new Date(start);
    end = end == '' || !end ? null : new Date(end);
    this.onChange.emit({ start:start,end:end});
  }
}
