import { Component } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-manager';
  public emplployees: Employee[];

  constructor(private employeeServie: EmployeeService) {
    this.emplployees = [];
  }

  public getEmployees(): void {
    this.employeeServie.getEmployees().subscribe({
      next: (response: Employee[]) => {
        this.emplployees = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}
