import { PatientAvgItemComponent } from '../patient/patient-avg-item/patient-avg-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeComponent } from './date-range/date-range.component';



@NgModule({
  declarations: [DateRangeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    DateRangeComponent
  ]
})
export class SharedModule { }
