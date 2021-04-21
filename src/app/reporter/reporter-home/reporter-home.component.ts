import { ReporterService } from './../../services/reporter.service';
import { Component, OnInit } from '@angular/core';
import { Reporter } from 'src/app/models/reporter.model';
import { PatientItem } from 'src/app/services/reporter.service';

@Component({
  selector: 'sacchon-reporter-home',
  templateUrl: './reporter-home.component.html',
  styleUrls: ['./reporter-home.component.scss']
})
export class ReporterHomeComponent implements OnInit {

  reporter:Reporter;

  constructor(private reporterSrv:ReporterService) { }

  ngOnInit(): void {
    this.reporterSrv.reporter.subscribe( r => this.reporter =r);
    this.reporterSrv.refreshInfo();
  }

}
