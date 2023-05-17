import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // private roles!: string[];
  private roles = new Array<string>();
  public authority!: string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        } else if (role === 'DEPARTMENT_RESPONSIBLE') {
          this.authority = 'DEPARTMENT_RESPONSIBLE';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  canManageUsers(): Boolean{
    const canManageUsers = this.roles.includes('SYS_ADMIN');
    return canManageUsers;
  }
}
