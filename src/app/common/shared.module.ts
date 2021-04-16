import { PatientAvgItemComponent } from '../patient/patient-avg-item/patient-avg-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeComponent } from './date-range/date-range.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DateRangeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    DateRangeComponent,
    FormsModule
  ]
})
export class SharedModule { }
