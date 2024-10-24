import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee';
import { TableListService } from '../../shared/services/table-list.service';
import { ToastService } from '../../shared/services/toast.service';
import { SharedModule } from '../../shared/shared.module';
import { AddEmployeeMadalComponent } from './add-employee-madal/add-employee-madal.component';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [SharedModule, AddEmployeeMadalComponent],
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  employees: Employee[] = [];
  isAddEmployeeModalOpen = false;
  selectedEmployee?: Employee;
  displayedColumns: string[] = ['name', 'country', 'city', 'salary', 'actions'];

  constructor(
    private tableService: TableListService,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    this.getEmployees();
  }
  private getEmployees(): void {
    this.tableService.getEmployees().subscribe((data) => {
      console.log('Full response:', data);
      this.employees = data;
    });
  }
  openAddEmployeeModal(employee?: Employee): void {
    this.isAddEmployeeModalOpen = true;
    this.selectedEmployee = employee;
  }
  closeAddEmployeeModal(): void {
    this.isAddEmployeeModalOpen = false;
    this.selectedEmployee = undefined;
  }

  handleAddEmployee(employee: Employee): void {
    this.tableService.addEmployee(employee).subscribe(
      () => {
        this.getEmployees();
        this.toastService.showSuccess('Employee added successfully');
      },
      () => {
        this.toastService.showError('Failed to add employee');
      }
    );
    this.closeAddEmployeeModal();
  }

  handleUpdateEmployee(employee: Employee): void {
    if (!this.selectedEmployee || !this.selectedEmployee.scrambledId) return;

    this.tableService
      .updateEmployee(this.selectedEmployee.scrambledId, employee)
      .subscribe(
        () => {
          this.getEmployees();
          this.toastService.showSuccess('Employee updated successfully');
        },
        () => {
          this.toastService.showError('Failed to update employee');
        }
      );
    this.closeAddEmployeeModal();
  }
  deleteEmployee(employee: Employee): void {
    if (!employee.scrambledId) return;
    this.tableService.deleteEmployee(employee.scrambledId).subscribe(
      () => {
        this.getEmployees();
        this.toastService.showSuccess('Employee deleted successfully');
      },
      () => {
        this.toastService.showError('Failed to delete employee');
      }
    );
  }
}
