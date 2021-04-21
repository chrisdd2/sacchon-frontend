import { DoctorService } from './../../services/doctor.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'sacchon-doctor-root',
  templateUrl: './doctor-root.component.html',
  styleUrls: ['./doctor-root.component.scss']
})
export class DoctorRootComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  showToolBar: boolean;
  doctor:Doctor;


  constructor(private breakpoint: BreakpointObserver,
    private doctorSrv:DoctorService) {
  }


  ngAfterViewInit(): void {
    this.breakpoint.observe('(max-width: 960px)').subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
        this.showToolBar = true;
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.showToolBar = false;
      }
    })
  }

  closeNav() {
    if (this.sidenav.mode == "over") {
      this.sidenav.close();
    }
  }

  ngOnInit(): void {
    this.doctorSrv.doctor.subscribe( d => {
      this.doctor=d;
    });
    this.doctorSrv.refreshInfo();
  }


}
