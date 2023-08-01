import { Component } from '@angular/core';
import {DepartmentService} from "../../department/department.service";
import {Observable} from "rxjs";
import {Department} from "../../department/department";

@Component({
  selector: 'app-credits-summary',
  templateUrl: './credits-summary.component.html',
  styleUrls: ['./credits-summary.component.css']
})
export class CreditsSummaryComponent {

  currentDepartment$ :Observable<Department|null>;

  constructor(private departmentService: DepartmentService) {
    this.currentDepartment$ = departmentService.currentDepartment$;
  }

}
