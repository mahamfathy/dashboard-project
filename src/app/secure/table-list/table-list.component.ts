import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmptySalaryDirective } from '../../shared/directives/empty-salary.directive';
import { IEmployee } from '../../shared/models/IEmployee';
import { CurrencySwitchPipe } from '../../shared/pipes/currency-switch.pipe';
import { DialogService } from '../../shared/services/dialog.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { NotificationService } from '../../shared/services/notification.service';
import { TableListService } from '../../shared/services/table-list.service';
import { ToastService } from '../../shared/services/toast.service';
import { SharedModule } from '../../shared/shared.module';
import { AddEmployeeMadalComponent } from './add-employee-madal/add-employee-madal.component';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [
    SharedModule,
    AddEmployeeMadalComponent,
    EmptySalaryDirective,
    CurrencySwitchPipe,
  ],
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  providers: [CurrencyPipe],
})
export class TableListComponent implements OnInit {
  employeesData = signal<Array<IEmployee>>([]);
  searchText = signal<string>('');

  filteredEmployees = computed(() => {
    const searchText = this.searchText().toLocaleLowerCase();
    return searchText
      ? this.employeesData().filter((employee) =>
          employee.name.toLocaleLowerCase().includes(searchText)
        )
      : this.employeesData();
  });
  employees = new MatTableDataSource<IEmployee>(this.filteredEmployees());

  isAddEmployeeModalOpen = false;
  selectedEmployee?: IEmployee;
  // displayedColumns: string[] = ['name', 'country', 'city', 'salary', 'actions'];
  displayedColumns = signal<Array<string>>([
    'name',
    'country',
    'city',
    'salary',
    'actions',
  ]).asReadonly();
  constructor(
    private tableService: TableListService,
    private toastService: ToastService,
    private dialogService: DialogService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private currencyPipe: CurrencyPipe
  ) {
    effect(() => {
      console.log('filteredEmployees', this.filteredEmployees().length);
      this.employees.data = this.filteredEmployees();
    });
  }
  ngOnInit() {
    this.getEmployees();
  }
  private getEmployees(): void {
    this.tableService.getEmployees().subscribe((data) => {
      console.log('Full response:', data);
      const sortedEmployees = data.sort((a: IEmployee, b: IEmployee) => {
        return a.name.localeCompare(b.name);
      });
      this.employeesData.set(sortedEmployees);
    });
  }
  openAddEmployeeModal(employee?: IEmployee): void {
    this.isAddEmployeeModalOpen = true;
    this.selectedEmployee = employee;
  }
  closeAddEmployeeModal(): void {
    this.isAddEmployeeModalOpen = false;
    this.selectedEmployee = undefined;
  }

  handleAddEmployee(employee: IEmployee): void {
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
    this.notificationService.addNotification({
      id: employee.scrambledId,
      title: `${employee.name} employee was added`,
      time: new Date().toISOString(),
      read: false,
      icon: 'fa fa-user',
    });
    this.closeAddEmployeeModal();
  }

  handleUpdateEmployee(employee: IEmployee): void {
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
    this.notificationService.addNotification({
      id: employee.scrambledId,
      title: `${employee.name} employee was updated`,
      time: new Date().toISOString(),
      read: false,
      icon: 'fas fa-user-edit',
    });
    this.closeAddEmployeeModal();
  }
  deleteEmployee(employee: IEmployee): void {
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

  getFormattedSalary(salary: number | string): string | null {
    const lang = this.localStorageService.getItem('lang') || 'en';
    const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
    const currency = lang === 'ar' ? 'ج.م' : 'EGP';
    const parsedSalary =
      typeof salary === 'string' ? parseFloat(salary) : salary;
    if (isNaN(parsedSalary)) {
      console.error('Invalid salary value:', salary);
      return null;
    }

    return this.currencyPipe.transform(
      parsedSalary,
      currency,
      'symbol',
      '1.0-0',
      locale
    );
  }
}
