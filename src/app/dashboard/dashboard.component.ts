import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: any;
  isLogin: any;

  ngOnInit(): void {
      const token = localStorage.getItem('token');
      if(token) {
        const nameOfUser = localStorage.getItem('username');
        this.isLogin = true;
        this.username = nameOfUser;
      } else {
        this.isLogin = false;
      }
  }
}
