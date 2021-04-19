import { DataService } from './../../services/data.service';
import { Component, OnInit,OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'sacchon-patient-root',
  templateUrl: './patient-root.component.html',
  styleUrls: ['./patient-root.component.scss']
})
export class PatientRootComponent implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  patient:Patient;
  active = new Subject<Boolean>()
  

  constructor(private breakpoint:BreakpointObserver,  private data:DataService) { 
  }
  ngAfterViewInit():void{
    this.breakpoint.observe('(max-width: 960px)').subscribe( (res) => {
      console.log(res);

      // if( res.matches ){
      //   this.sidenav.mode = 'over';
      //   this.sidenav.close();
      // } else{
      //   this.sidenav.mode = 'side';
      //   this.sidenav.open();
      // }
    })
    console.log(this.sidenav);
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    this.active.next(true);
  }

}
