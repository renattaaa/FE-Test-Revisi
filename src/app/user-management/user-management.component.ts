import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  firstName: any;
  lastName: any;
  showSuccess: any;
  createdUser: any;
  userData: any;
  searchQuery: any;
  deletedUserId: any = null;
  editUser: any = null;
  updatedUserId: any = null;
  username: any;
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

  search(): void {
    if (this.searchQuery) {
      const url = `https://dummyjson.com/users/search?q=${encodeURIComponent(
        this.searchQuery
      )}`;
      this.http.get(url).subscribe((data: any) => {
        this.userData = data.users;
        this.deletedUserId = null;
        // console.log(this.userData);
      });
    }
  }

  createUser(): void {
    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
    };

    this.http.post<any>('https://dummyjson.com/users/add', body).subscribe(
      (response) => {
        this.showSuccess = true;
        this.createdUser = response;
        // Clear form inputs
        this.firstName = '';
        this.lastName = '';
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // userId = user.id yag ada di html
  deleteUser(userId: number): void {
    const url = `https://dummyjson.com/users/${userId}`;

    this.http.delete(url).subscribe(
      (response: any) => {
        if (response.isDeleted === true) {
          console.log(`User with ID ${userId} has been deleted successfully.`);
          this.deletedUserId = userId;
          // Update the user list after successful deletion
          this.userData = this.userData.filter(
            (user: any) => user.id !== userId
          );
          this.updatedUserId = null;
        } else {
          console.error(`Failed to delete user with ID ${userId}.`);
        }
      },
      (error: any) => {
        console.error(
          `An error occurred while deleting user with ID ${userId}.`
        );
      }
    );
  }

  openEditModal(user: any): void {
    this.editUser = { ...user };
  }

  closeEditModal(): void {
    this.editUser = null;
  }

  saveUserChanges(): void {
    const url = `https://dummyjson.com/users/${this.editUser.id}`;
    const updateData = { // ini body yang mau di update
      firstName: this.editUser.firstName,
      lastName: this.editUser.lastName,
    };
    let numberId = parseInt(this.editUser.id);
    this.http.put(url, updateData).subscribe(
      (res: any) => {
        console.log('success!');
        let length = this.userData.length;
        let index = -1;

        for(let i = 0; i < length; i++) {
          if(this.userData[i].id === numberId) {
            index = i;
            console.log('masok if');
          }
        }

        if(index !== -1) {
          this.userData[index] = { ...updateData, id: numberId };
          this.updatedUserId = numberId;
          this.deletedUserId = null;
        }
      },
      (err: any) => {
        console.error(err);
      }
    );

    this.closeEditModal();
  }
}
