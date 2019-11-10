import { Component } from '@angular/core';
import { DashboardService } from './Services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  LoginContent = '';

  constructor(private dashboardService: DashboardService) { }

  Login() {
    this.dashboardService.LoadLoginPage();
  }
}
