import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {Department} from "./department/department";
import {DepartmentService} from "./department/department.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // private roles!: string[];
  private roles = new Array<string>();
  public authority!: string;


  selectedDepartment: Department | null = null;
  departments!: Department[];


  constructor(private tokenStorage: TokenStorageService,
              private departmentService: DepartmentService,
              private router: Router) {

  }


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

        /*this.cars = [
          { id: 1, name: 'Volvo' },
          { id: 2, name: 'Saab' },
          { id: 3, name: 'Opel' },
          { id: 4, name: 'Audi' },
        ];*/
        this.departmentService.findAvailableDepartmentsForAccount(this.tokenStorage.getUsername()!)

          .subscribe(/*x => {
        this.person = x;
        this.loginForm.get("role")!.patchValue(x.profile);
        //this.loginForm.patchValue(x)*/
            result => {
              this.departments = result.content;
            }
          );

        return true;
      });


      this.departmentService.currentDepartment$.subscribe(
        department => {
          this.selectedDepartment = department;
          this.router.navigate(['/credits-summary']);
        }
      );
    }
  }

  canManageUsers(): Boolean {
    const canManageUsers = this.roles.includes('SYS_ADMIN');
    return canManageUsers;
  }


  getValues() {
    console.log(this.selectedDepartment);
    this.departmentService.updateCurrentDepartment(this.selectedDepartment);
  }
}
