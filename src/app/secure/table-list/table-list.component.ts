import { Component, computed, OnInit, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmptySalaryDirective } from '../../shared/directives/empty-salary.directive';
import { Employee } from '../../shared/models/employee';
import { DialogService } from '../../shared/services/dialog.service';
import { TableListService } from '../../shared/services/table-list.service';
import { ToastService } from '../../shared/services/toast.service';
import { SharedModule } from '../../shared/shared.module';
import { AddEmployeeMadalComponent } from './add-employee-madal/add-employee-madal.component';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [SharedModule, AddEmployeeMadalComponent, EmptySalaryDirective],
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  employeesData = signal<Array<Employee>>([]);
  searchText = signal<string>('');

  filteredEmployees = computed(() => {
    const searchText = this.searchText().toLocaleLowerCase();
    return searchText
      ? this.employeesData().filter((employee) =>
          employee.name.toLocaleLowerCase().includes(searchText)
        )
      : this.employeesData();
  });
  employees = new MatTableDataSource<Employee>(this.filteredEmployees());

  isAddEmployeeModalOpen = false;
  selectedEmployee?: Employee;
  displayedColumns: string[] = ['name', 'country', 'city', 'salary', 'actions'];

  constructor(
    private tableService: TableListService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) {}
  ngOnInit() {
    this.getEmployees();
  }
  private getEmployees(): void {
    this.tableService.getEmployees().subscribe((data) => {
      console.log('Full response:', data);
      const sortedEmployees = data.sort((a: Employee, b: Employee) => {
        return a.name.localeCompare(b.name);
      });
      this.employeesData.set(sortedEmployees);
      this.employees.data = this.filteredEmployees();
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

        this.employees.data = this.filteredEmployees();
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
          this.employees.data = this.filteredEmployees();
          this.toastService.showSuccess('Employee updated successfully');
        },
        () => {
          this.toastService.showError('Failed to update employee');
        }
      );
    this.closeAddEmployeeModal();
  }
  deleteEmployee(employee: Employee): void {
    const dialogRef = this.dialogService.openConfirmDeleteDialog(employee);

    dialogRef.afterClosed().subscribe((res: { confirmDelete: boolean }) => {
      if (res?.confirmDelete) {
        this.tableService.deleteEmployee(employee.scrambledId).subscribe(
          () => {
            this.employeesData.update((employees) =>
              employees.filter((e) => e.scrambledId !== employee.scrambledId)
            );
            this.employees.data = this.filteredEmployees();
            this.toastService.showSuccess('Employee deleted successfully');
          },
          () => {
            this.toastService.showError('Failed to delete employee');
          }
        );
      }
    });
  }

  updateSearchText(searchText: string): void {
    this.searchText.set(searchText);
    this.employees.data = this.filteredEmployees();
  }
}
