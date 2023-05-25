import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  name: any;
  username: any;
  email: any;
  gender: any;
  userData: any;
  isLogin: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void { // first reload
    const token = localStorage.getItem('token');
      if(token) {
        const nameOfUser = localStorage.getItem('username');
        this.isLogin = true;
        this.username = nameOfUser;
        this.http.get('https://dummyjson.com/users').subscribe(
          (data: any) => {
            this.userData = data.users;
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      } else {
        this.isLogin = false;
      }
  }
}
