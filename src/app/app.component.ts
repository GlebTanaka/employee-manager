import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employee-manager';
  public employees: Employee[];
  public defaultEmployee: Employee;

  constructor(private employeeServie: EmployeeService) {
    this.employees = [];
    this.defaultEmployee = {
      id: 0,
      name: '',
      email: '',
      jobTitle: '',
      phone: '',
      imageUrl: '',
      employeeCode: '',
    }
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeServie.getEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onOpenModal(emloyee: Employee, mode: string): void { // takes an Employee object and string 
    const container = document.getElementById('main-container') // getting our container
    const button = document.createElement('button'); // adding a button to the container
    button.type = 'button'; 
    button.style.display = 'none'; // nake it invisible
    button.setAttribute('data-bs-toggle', 'modal'); // set the attribute to a modal
    // check the parameter mode to trigger the right modal popup
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal')
    }
    if (mode === 'edit') {
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button); // add button to our main container
    button.click(); // call a cklick on the button
  }
}
