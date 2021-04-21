import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakStatement } from 'typescript';


@Component({
  selector: 'sacchon-reporter-root',
  templateUrl: './reporter-root.component.html',
  styleUrls: ['./reporter-root.component.scss']
})
export class ReporterRootComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav) sidenav: MatSidenav;


  showToolBar: boolean;
  hasNotification: boolean;


  constructor(private breakpoint: BreakpointObserver,
  ) {
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
  }


}

