import { DoctorService } from './../../services/doctor.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'sacchon-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.scss']
})
export class DoctorHomeComponent implements OnInit,OnDestroy {

  doctor:Doctor;

  sub:Subscription;
  constructor(private doctorSrv:DoctorService) { }

  ngOnInit(): void {
    this.sub=this.doctorSrv.doctor.subscribe( d => {
      this.doctor=d;
    });
    this.doctorSrv.refreshInfo();
  }
  ngOnDestroy():void{
    this.sub.unsubscribe();
  }

}
