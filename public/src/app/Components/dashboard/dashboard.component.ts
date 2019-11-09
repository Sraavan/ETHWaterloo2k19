import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  statusMsg = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  TakeASnapshot() {
    this.dashboardService.TakeASnapshot()
      .subscribe(res => {
        this.statusMsg = res['result'];
      });

  }

}
